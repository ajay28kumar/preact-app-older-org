// @flow
/** @jsx h */
import { h, Component } from 'preact';
import { lazy, Suspense } from 'preact/compat';
import { connect } from 'react-redux';
import withBaseComponent from '../../HOC/withBaseComponent';
import Permissions from '../../utils/permissions';
import bicAction from '../../actions/bicAction';
import actionType from '../../actions/bicAction/actionType';
import { apiStatus } from '../../actionTypes';
import type { BicContentType } from '../../modelType/bicType';
import type { ApiState } from '../../modelType';
import { getStorageLenderId } from '../../utils/lenderTheme';
import {
  getLocalstorage,
  getSessionStorage,
  setLocalStorage,
} from '../../utils';

type Props = {
  apiState: ApiState,
  uiComponents: Array<BicContentType>,
  matches: Object,
  bicAction: Function,
};

const BicContainer = lazy(() =>
  import(/* webpackChunkName: "bic-partial-component" */ '../../components/buyWithInstacredLanding/bicContainer'),
);

class BuyWithInstacredLandingPage extends Component<Props> {
  pageKey = 'pv_buy_with_instacred_home_bic';
  campaignId = this.props.matches.utm_campaign || '';
  lenderId = getStorageLenderId();
  metadata = { campaign_id: this.campaignId, lender_id: this.lenderId };

  componentDidMount() {
    let apiState = true;
    if (this.props.apiState === apiStatus.SUCCESS) {
      const { campaignId: oldCampaignId, merchantHandle: oldMerchantHandle } =
        this.props || {};
      const { merchantHandle, utm_campaign: utmCampaign } =
        this.props.matches || {};
      apiState = !(
        oldMerchantHandle === merchantHandle && oldCampaignId === utmCampaign
      );
    }
    this.getBicData(apiState);
    setTimeout(() => {
      new Permissions(this.pageKey).askForPushNotification();
      const { prompt } = window.addToHomeScreenObject || {};
      const hidePrompt = getLocalstorage('hideAddToHomeScreenPrompt');
      this.setState({
        showAddToHomeScreenPrompt: prompt && !hidePrompt,
      });
    }, 3000);
  }

  componentDidUpdate(previousProps: Props) {
    const {
      utm_campaign: prevUtmCampaign,
      merchantHandle: prevMerchantHandle,
    } = previousProps.matches || {};
    const { utm_campaign: utmCampaign, merchantHandle } =
      this.props.matches || {};
    if (
      prevMerchantHandle !== merchantHandle ||
      prevUtmCampaign !== utmCampaign
    ) {
      this.getBicData(true);
    }
  }

  getBicData = (shouldFetchApi: boolean) => {
    const { bicAction, lenderId } = this.props || {};
    let { utm_campaign: utmCampaign } = this.props.matches || {};
    const { merchantHandle } = this.props.matches || {};
    if (!utmCampaign) {
      utmCampaign = lenderId;
    }
    setLocalStorage('utmCampaign', utmCampaign || '');
    bicAction(actionType.initializeBIC, {
      shouldFetchApi,
      campaignId: utmCampaign,
      merchantHandle,
    });
  };

  render() {
    const { apiState, uiComponents, bicAction } = this.props;
    return (
      <Suspense fallback={null}>
        <BicContainer
          apiStatus={apiState}
          uiComponents={uiComponents}
          pageKey={this.pageKey}
          bicAction={bicAction}
        />
      </Suspense>
    );
  }
}

const mapStateToProps = ({ buyWithInstacred, registrationUserData }) => {
  const { home } = buyWithInstacred || {};
  const { uiComponents, merchantMetadata, apiState } = home || {};
  const { lenderId } = registrationUserData;
  const authDetails = getSessionStorage('authDetails');
  const { login } = authDetails ? JSON.parse(authDetails) : {};
  const userRegistered = getLocalstorage('userRegistered') || '';
  const extraUiComponents = [];
  //removed temporary for Ikea-campaign with flexipay
  /*
  if (Object.keys(merchantMetadata).length) {
    extraUiComponents.push('SHOW_DEFAULT_BIC');
  }
   */
  //user-eligible-display-logic
  if (
    !login &&
    userRegistered !== 'true' &&
    (!lenderId || lenderId === 'instaCred')
  ) {
    extraUiComponents.push('SHOW_USER_ELIGIBLE');
  }
  return {
    apiState,
    lenderId,
    uiComponents: [...uiComponents, ...extraUiComponents],
  };
};

export default connect(
  mapStateToProps,
  { bicAction },
)(withBaseComponent(BuyWithInstacredLandingPage));
