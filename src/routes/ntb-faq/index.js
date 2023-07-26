/** @jsx h */
// @flow
import { h, Component } from 'preact';
import { connect } from 'react-redux';
import Helmet from 'preact-helmet';
import withBaseComponent from '../../HOC/withBaseComponent';
import ntbFaqAction from '../../actions/ntbFaqAction';
import actionType from '../../actions/ntbFaqAction/actionType';
import { tracker, UserActionType } from '../../tracking';
import NtbFaqSection from '../../components/faq/NtbFaqSection';
import BrowserExitTracking from '../../components/common/browserExitTracking';

import style from './style.css';

type State = {
  activeIndex: number,
};

type Props = {
  matches: Object,
  ntbFaqAction: Function,
};

class NtbFAQ extends Component {
  pageKey = 'NTB FAQ';
  index = Number;
  state = {
    activeIndex: -1,
  };
  componentDidMount() {
    const { utm_campaign: campaignId } = this.props.matches || {};
    this.props.ntbFaqAction(actionType.initNtbFaq, {
      campaignId,
    });
  }

  openFaqSection = ({ activeId, index, sectionId }) => {
    this.setState({
      activeIndex: activeId,
    });
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'FAQ Item - ' + (index + 1),
      this.pageKey,
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
      <div className={style.pageWrapper}>
        <BrowserExitTracking
          pageKey={this.pageKey}
          elementName='Close Window'
        />
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
        <NtbFaqSection
          activeId={this.state.activeIndex}
          openFaqSection={this.openFaqSection}
          closeFaqSection={this.closeFaqSection}
        />
      </div>
    );
  }
}

export default connect(
  null,
  { ntbFaqAction },
)(withBaseComponent(NtbFAQ));
