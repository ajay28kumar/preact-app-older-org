// @flow
/** @jsx h */
import { Component, h } from 'preact';
import actionType from '../../actions/privacyPolicyAction/actionType';
import TermsAndConditionList from '../../components/privacyPolicyList/termsAndConditionList';
import { connect } from 'react-redux';
import privacyPolicyAction from '../../actions/privacyPolicyAction';
import withBaseComponent from '../../HOC/withBaseComponent';
import { getStorageLenderId } from '../../utils/lenderTheme';
import GenericFooter from '../../components/common/genericFooter';

class TermsAndCondition extends Component {
  pageKey = 'pv_t&c';
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
        <TermsAndConditionList pageKey={this.pageKey} />
        <GenericFooter overrideMargin={true} />
      </div>
    );
  }
}

export default connect(
  null,
  { privacyPolicyAction },
)(withBaseComponent(TermsAndCondition));
