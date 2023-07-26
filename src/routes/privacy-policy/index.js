/** @jsx h */
import { h, Component } from 'preact';
import { connect } from 'react-redux';
import privacyPolicyAction from '../../actions/privacyPolicyAction';
import withBaseComponent from '../../HOC/withBaseComponent';
import actionType from '../../actions/privacyPolicyAction/actionType';
import PrivacyPolicyList from '../../components/privacyPolicyList';
import { getStorageLenderId } from '../../utils/lenderTheme';
import GenericFooter from '../../components/common/genericFooter';

class PrivacyPolicy extends Component {
  pageKey = 'pv_privacy_policy';
  campaignId = this.props.matches.utm_campaign || '';
  lenderId = getStorageLenderId();
  metadata = { campaign_id: this.campaignId, lender_id: this.lenderId };

  componentDidMount() {
    const { utm_campaign: campaignId } = this.props.matches || {};
    this.props.privacyPolicyAction(actionType.initPrivacyPolicy, {
      campaignId,
    });
  }

  render() {
    return (
      <div>
        <PrivacyPolicyList pageKey={this.pageKey} />
        <GenericFooter overrideMargin={true} />
      </div>
    );
  }
}

export default connect(
  null,
  { privacyPolicyAction },
)(withBaseComponent(PrivacyPolicy));
