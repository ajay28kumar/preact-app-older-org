// @flow
/** @jsx h */
import { h, Component } from 'preact';
import { connect } from 'react-redux';
import aboutUsAction from '../../actions/aboutUsAction';
import withBaseComponent from '../../HOC/withBaseComponent';
import actionType from '../../actions/aboutUsAction/actionType';
import style from './style.css';
import GenericFooter from '../../components/common/genericFooter';
import LenderSlider from './components/lenderSlider/';
import MerchantSlider from './components/merchantSlider/';
import HowItWorks from './components/howItWorks/';
import Achievements from './components/achievements/';
import KeyHighlights from './components/keyHighlights';

class AboutUs extends Component {
  pageKey = 'About';
  componentDidMount() {
    const { utm_campaign: campaignId } = this.props.matches || {};
    this.props.aboutUsAction(actionType.initAboutUs, {
      campaignId,
    });
  }

  render() {
    return (
      <div className={style.container}>
        <div className={`${style.aboutHeader} text80 font20 bold-text`}>
          About InstaCred
        </div>
        <div
          className={`${style.aboutContents} text60 ${
            style.topContent
          } font16`}>
          InstaCred™, Flexmoney’s 360° Instant Cardless Credit Platform, allows
          you to Buy Now and Pay Later using Credit Limit offered to you by your
          trusted Bank/NBFC.
        </div>
        <div className={`${style.aboutContents} text60 font16`}>
          InstaCred™ enables you to avail Cardless EMI or Pay Later services
          across its network of Leading Online websites and In-Store merchants.
          No paperwork! No card needed! Simply use your mobile number to
          transact.
        </div>

        <div className={`${style.aboutContents} font14`}>
          <div
            className={`${style.benefitsHeader} font20 bold-text text-center`}>
            Shop with Cardless EMI
          </div>
          <div>
            <KeyHighlights />
          </div>
        </div>

        <div className={style.ourNetworkContainer}>
          <div
            className={`${style.aboutHeader} ${
              style.ourNetworkHeader
            } font20 bold-text text80`}>
            Our Network
          </div>
          <MerchantSlider />
          <LenderSlider />
          <div
            className={`${style.aboutContents}  ${style.counterWrapper} ${
              style.achievementsWrapper
            } font14`}>
            <Achievements />
          </div>
        </div>

        <HowItWorks />
        <GenericFooter />
      </div>
    );
  }
}

export default connect(
  null,
  { aboutUsAction },
)(withBaseComponent(AboutUs));
