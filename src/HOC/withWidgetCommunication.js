import { h, Component } from 'preact';
import { connect } from 'react-redux';
import widgetAction from '../actions/widgetAction';
import actionType from '../actions/widgetAction/actionType';
import Spinner from '../components/spinner/spinner';

const withWidgetCommunication = (WrappedComponent) => {
  return connect(
    null,
    { widgetAction },
  )(
    class extends Component {
      state = {
        dataFromParent: null,
        shouldRender: false,
      };
      componentDidMount() {
        window.addEventListener('message', this.handleIframeTask);
      }
      handleIframeTask = (e) => {
        if (typeof e.data === 'object' || e.origin === window.location.origin) {
          return;
        }
        const { merchantKey, merchantURL, metadata } = JSON.parse(e.data);
        this.props.widgetAction(actionType.storeMetaData, { metadata });
        if (merchantKey) {
          const headers = {
            'ic-merchant-key': merchantKey,
            'ic-origin': e.origin,
          };
          const merchantData = {
            merchantURL,
          };

          this.props.widgetAction(actionType.storeHeader, {
            headers,
            merchantData,
          });
          this.setState({
            shouldRender: true,
          });
        }
        this.setState({
          dataFromParent: e.data,
        });
      };
      communicateDataToParent = (data) => {
        return window.parent.postMessage(JSON.stringify(data), '*');
      };
      render() {
        const { shouldRender } = this.state || {};
        if (!shouldRender) {
          return (
            <div className='loaderContainer'>
              <Spinner />
            </div>
          );
        }
        return (
          <WrappedComponent
            {...this.props}
            dataFromParent={this.state.dataFromParent}
            communicateDataToParent={this.communicateDataToParent}
          />
        );
      }
    },
  );
};

export default withWidgetCommunication;
