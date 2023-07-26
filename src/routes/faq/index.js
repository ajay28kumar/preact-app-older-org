/** @jsx h */
import { h, Component } from 'preact';
import { connect } from 'react-redux';
import Helmet from 'preact-helmet';
import withBaseComponent from '../../HOC/withBaseComponent';
import { getStorageLenderId, lenderTheme } from '../../utils/lenderTheme';
import bicAction from '../../actions/bicAction';
import actionType from '../../actions/bicAction/actionType';
import GeneralFAQSection from '../../components/faq/GeneralFaqSection';
import LenderFAQSection from '../../components/faq/LenderFAQSection';
import { tracker, UserActionType } from '../../tracking';
import GenericFooter from '../../components/common/genericFooter';

class FAQ extends Component {
  pageKey = 'pv_faqs';
  index = Number;
  state = {
    activeIndex: -1,
  };
  campaignId = this.props.matches.utm_campaign || '';
  lenderId = getStorageLenderId();
  metadata = { campaign_id: this.campaignId, lender_id: this.lenderId };

  componentDidMount() {
    let { matches, lenderId: lenderIdFromProps } = this.props;
    const subDomain = window.location.hostname.split('.')[0];
    if (subDomain === 'instacred' && lenderIdFromProps === 'instaCred') {
      lenderIdFromProps = undefined;
    }
    const { utm_campaign: campaignId, q: queryParameter } = matches || {};
    /**
     * lenderId priority is existing-lenderId ====> query-params ====> lenderId from storage
     * @type {*|string|string}
     */
    let activeLenderId;
    if (queryParameter) {
      for (const lender in lenderTheme) {
        const lenderDetail = lenderTheme[lender];
        if (lenderDetail.subDomainName.includes(queryParameter)) {
          activeLenderId = lenderDetail.lenderId;
          break;
        }
      }
    }

    const lenderId =
      lenderIdFromProps || activeLenderId || getStorageLenderId();
    this.props.bicAction(actionType.initializeFaqScreen, {
      campaignId,
      lenderDetails: { ...lenderTheme[lenderId], id: lenderId },
    });
  }

  openFaqSection = ({ activeId, index, sectionId }) => {
    this.setState({
      activeIndex: activeId,
    });
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'FAQ Item - ' + (index + 1),
      this.props.pageKey,
      { sectionName: sectionId },
    );
  };
  closeFaqSection = () => {
    this.setState({
      activeIndex: -1,
    });
  };

  render() {
    return (
      <div>
        <Helmet
          meta={[
            {
              name: 'description',
              content:
                'InstaCred is a platform that enables users to activate, utilize and manage a cardless EMI ' +
                'credit line on behalf of the lending partner at our merchant network.',
            },
          ]}
        />
        <GeneralFAQSection
          activeId={this.state.activeIndex}
          openFaqSection={this.openFaqSection}
          closeFaqSection={this.closeFaqSection}
        />
        <LenderFAQSection
          activeId={this.state.activeIndex}
          openFaqSection={this.openFaqSection}
          closeFaqSection={this.closeFaqSection}
        />
        <GenericFooter overrideMargin={true} />
      </div>
    );
  }
}

const mapStateToProps = ({ registrationUserData }) => {
  const { lenderId } = registrationUserData;
  return {
    lenderId,
  };
};
export default connect(
  mapStateToProps,
  { bicAction },
)(withBaseComponent(FAQ));
