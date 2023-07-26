/** @jsx h */
import { h, Component } from 'preact';
import requestService from '../../api/services/requestService';
import { apiStatus } from '../../actionTypes';
import { removeBlankKeys } from '../../components/material-ui/helper';
import { connect } from 'react-redux';
import widgetAction from '../../actions/widgetAction';
import actionType from '../../actions/widgetAction/actionType';
import { PageLoadType, tracker, UserActionType } from '../../tracking';
import { fetchUserEligibleEMI } from '../../api/controllers/widgetControllers';
import Utils, { getLocalstorage } from '../../utils';
import { CLIENT_ID_COOKIE_KEY } from '../../tracking/helper';
import {
  experimentName,
  fetchExperimentData,
} from '../../api/controllers/experimentController';

class WidgetCommunicationScreen extends Component {
  componentDidMount() {
    window.addEventListener('message', this.handleIframeTask);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleIframeTask);
  }

  handleIframeTask = (e) => {
    if (typeof e.data === 'object' || e.origin === window.location.origin) {
      return;
    }
    const { dataType, requestName, request, merchantKey } =
      JSON.parse(e.data) || {};
    if (dataType === 'tracking') {
      const { eventType, trackingData } = request || {};
      switch (eventType) {
        case 'pageView': {
          const { pageKey, metadata } = trackingData || {};
          return tracker.trackPageView(PageLoadType.DYNAMIC, pageKey, metadata);
        }
        case 'userAction': {
          const { elementName, pageKey, metadata } = trackingData || {};
          return tracker.trackUserInteraction(
            UserActionType.CLICK,
            elementName,
            pageKey,
            metadata,
          );
        }
        default:
          return null;
      }
    }
    if (dataType === 'apiType') {
      const headers = {
        'ic-merchant-key': merchantKey,
        'ic-origin': e.origin,
      };
      this.props.widgetAction(actionType.storeHeader, headers);
      /**
       * If else condition Added to make sure that previous version will also support the communication
       * TODO: Remove the else condition after caching related
       * issue won't be there and also remove `this.getData` methods
       */
      if (requestName) {
        this.handleAPIRequest(requestName, request, { headers });
      } else {
        this.sendDataToParents({
          responseType: 'apiResponse',
          apiStatus: apiStatus.INITIATED,
          response: {},
        });
        this.getData(null, removeBlankKeys(request), { headers })
          .then((resp) => {
            this.sendDataToParents({
              responseType: 'apiResponse',
              apiStatus: apiStatus.SUCCESS,
              response: resp,
            });
          })
          .catch((error) => {
            this.sendDataToParents({
              responseType: 'apiResponse',
              apiStatus: apiStatus.ERROR,
              response: error,
            });
          });
      }
    }
  };

  handleAPIRequest = (requestName, requestData, header) => {
    this.sendDataToParents({
      requestName,
      responseType: 'apiResponse',
      apiStatus: apiStatus.INITIATED,
      response: {},
    });
    switch (requestName) {
      case 'checkUserEligibility':
        const { mobile, amount } = requestData;
        return fetchUserEligibleEMI({ mobile, amount }, null, header)
          .then((resp) => {
            this.sendDataToParents({
              requestName,
              responseType: 'apiResponse',
              apiStatus: apiStatus.SUCCESS,
              response: resp,
            });
          })
          .catch((error) => {
            this.sendDataToParents({
              requestName,
              responseType: 'apiResponse',
              apiStatus: apiStatus.ERROR,
              response: error,
            });
          });
      case 'widgetNonLoggedInExperiment':
        const clientId =
          Utils.getCookie(CLIENT_ID_COOKIE_KEY) ||
          getLocalstorage(CLIENT_ID_COOKIE_KEY);
        const data = {
          experimentName: experimentName.WIDGET_NL_VARIANT,
          uniqueId: clientId,
        };
        return fetchExperimentData(data, null, header)
          .then((resp) => {
            this.sendDataToParents({
              requestName,
              responseType: 'apiResponse',
              apiStatus: apiStatus.SUCCESS,
              response: resp,
              experimentName: experimentName.WIDGET_NL_VARIANT,
            });
          })
          .catch(() => {
            this.sendDataToParents({
              requestName,
              responseType: 'apiResponse',
              apiStatus: apiStatus.SUCCESS,
              response: { data: { value: 'A' } }, //making sure in case of error we are getting 'A' variant only
              experimentName: experimentName.WIDGET_NL_VARIANT,
            });
          });
      default:
        return null;
    }
  };

  sendDataToParents = (data = {}) => {
    //TODO: Add proper origin URL to send message instead of *
    window.parent.postMessage(JSON.stringify(data), '*');
  };

  getData = (query, request, header) => {
    return requestService(query, request, (d) => d.data, null, null, header);
  };

  render() {
    return null;
  }
}

export default connect(
  null,
  { widgetAction },
)(WidgetCommunicationScreen);
