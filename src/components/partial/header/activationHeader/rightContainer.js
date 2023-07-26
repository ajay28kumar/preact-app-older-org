import { h, Component } from 'preact';
import { route } from 'preact-router';
import { faqRoute } from '../../../../alias/homeRoutes';
import style from '../../style.css';
import { connect } from 'react-redux';
import { tracker, UserActionType } from '../../../../tracking';

class RightContainer extends Component {
  openFaq = () => {
    const { lenderId, pageKey, campaignId } = this.props || {};
    tracker.trackUserInteraction(UserActionType.CLICK, 'ap_faqs', pageKey, {
      lender_id: lenderId,
      campaign_id: campaignId,
    });
    const lenderQueryParams = lenderId && `q=${lenderId}`;
    const campaignQueryParams = campaignId && `utm_campaign=${campaignId}`;
    let queryParams;
    if (campaignQueryParams && lenderQueryParams) {
      queryParams = `?${lenderQueryParams}&${campaignQueryParams}`;
    } else if (campaignQueryParams) {
      queryParams = `?${campaignQueryParams}`;
    } else if (lenderQueryParams) {
      queryParams = `?${lenderQueryParams}`;
    }
    route(`${faqRoute.path}?${queryParams}`);
  };
  render() {
    return (
      <img
        onClick={this.openFaq}
        src='https://iccdn.in/img/powered-by-white.svg'
        className={style.icLogo}
        alt='Powered by InstaCred'
      />
    );
  }
}
const mapStateToProps = ({
  config,
  registrationUserData,
  buyWithInstacred,
}) => {
  const { pageKey } = config;
  const { lenderId } = registrationUserData;
  const { home } = buyWithInstacred;
  const { campaignId } = home;
  return {
    pageKey,
    lenderId,
    campaignId,
  };
};
export default connect(mapStateToProps)(RightContainer);
