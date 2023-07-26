/** @jsx h */
import { h, Component, Fragment } from 'preact';
import { connect } from 'react-redux';
import widgetActivationAction from '../../../actions/widgetActivationAction';
import actionType from '../../../actions/widgetActivationAction/actionType';
import style from './style.css';
import { apiStatus } from '../../../actionTypes';
import Footer from './footer';
import PoweredBy from '../poweredBy';
import { isMobile } from '../../../utils/helper';
import {
  EnterMobileNumberScreen,
  NonApprovedScreen,
  VerifyOTPScreen,
} from './screens';
import { tracker, UserActionType } from '../../../tracking';
import metadata from '../../../reducer/widgetData/metadata';
import Header from './header';
import CheckEligibleBenefit from './screens/verifyOTPScreen/checkEligibleBenefit';

class CheckEligible extends Component {
  state = {
    displayStatus: 'enterMobile',
    mobileNumber: '',
  };
  componentDidMount() {
    this.initScreen();
  }

  initScreen = () => {
    this.props.widgetActivationAction(actionType.initScreen);
    this.setState({
      displayStatus: 'enterMobile',
    });
  };

  componentDidUpdate(previousProps) {
    const { sendOTPApiState, verifyOTPApiState, isPreApproved } =
      this.props || {};
    //render OTP screen
    if (
      sendOTPApiState !== previousProps.sendOTPApiState &&
      sendOTPApiState === apiStatus.SUCCESS
    ) {
      this.updateScreen('verifyMobile');
    }
    //render activation success screen
    if (
      verifyOTPApiState !== previousProps.verifyOTPApiState &&
      verifyOTPApiState === apiStatus.SUCCESS
    ) {
      if (isPreApproved) {
        this.onSuccessVerification();
      } else {
        const { communicateDataToParent } = this.props || {};
        const { mobileNumber } = this.state || {};
        communicateDataToParent({
          actionType: 'CLICK',
          actionName: 'updateMobileNumber',
          contactNumber: mobileNumber,
          widgetState: mobileNumber
            ? isPreApproved
              ? 'PreApproved'
              : 'NotApproved'
            : 'NotLoggedIn',
        });
        this.updateScreen('nonEligibleScreen');
      }
    }
  }

  onSuccessVerification = () => {
    const { communicateDataToParent, isPreApproved } = this.props || {};
    const { mobileNumber } = this.state || {};
    communicateDataToParent({
      actionType: 'CLICK',
      actionName: 'closeBottomPanel_openEMIPanel',
      contactNumber: mobileNumber,
      widgetState: mobileNumber
        ? isPreApproved
          ? 'PreApproved'
          : 'NotApproved'
        : 'NotLoggedIn',
    });
  };

  checkEligibleAction = (actionType, ...rest) => {
    this.props.widgetActivationAction(actionType, ...rest);
  };

  updateMobileNumber = (mobileNumber) => {
    this.setState({ mobileNumber });
  };
  updateScreen = (displayStatus) => {
    this.setState({ displayStatus });
  };

  trackUserAction = (elementName, pageKey, other) => {
    const { merchantData } = this.props || {};
    const { merchantURL } = merchantData || {};
    tracker.trackUserInteraction(UserActionType.CLICK, elementName, pageKey, {
      device: isMobile ? 'mobile' : 'desktop',
      merchant_url: merchantURL,
      ...other,
    });
  };

  renderScreens = () => {
    const { displayStatus, mobileNumber } = this.state || {};
    const { merchantData, metadata } = this.props || {};
    const { merchantURL } = merchantData || {};

    switch (displayStatus) {
      case 'enterMobile': {
        const { contactNumber, errorMessage, sendOTPApiState } =
          this.props || {};
        return (
          <EnterMobileNumberScreen
            contactNumber={contactNumber}
            mobileNumber={mobileNumber}
            errorMessage={errorMessage}
            sendOTPApiState={sendOTPApiState}
            metadata={metadata}
            merchantURL={merchantURL}
            checkEligibleAction={this.checkEligibleAction}
            updateMobileNumber={this.updateMobileNumber}
            trackUserAction={this.trackUserAction}
          />
        );
      }
      case 'verifyMobile':
        const { amount, errorMessage, verifyOTPApiState } = this.props || {};
        return (
          <VerifyOTPScreen
            mobileNumber={mobileNumber}
            amount={amount}
            errorMessage={errorMessage}
            verifyOTPApiState={verifyOTPApiState}
            metadata={metadata}
            merchantURL={merchantURL}
            initScreen={this.initScreen}
            checkEligibleAction={this.checkEligibleAction}
            trackUserAction={this.trackUserAction}
          />
        );
      case 'nonEligibleScreen': {
        const { mobileNumber: contactNumber } = this.state || {};
        const {
          sendNTBSmsState,
          communicateDataToParent,
          isNtbAllowed,
          amount,
        } = this.props || {};
        return (
          <NonApprovedScreen
            isNtbAllowed={isNtbAllowed}
            amount={amount}
            contactNumber={contactNumber}
            mobileNumber={mobileNumber}
            metadata={metadata}
            merchantURL={merchantURL}
            initScreen={this.initScreen}
            communicateDataToParent={communicateDataToParent}
            sendNTBSmsState={sendNTBSmsState}
            checkEligibleAction={this.checkEligibleAction}
            trackUserAction={this.trackUserAction}
          />
        );
      }
      default:
        return null;
    }
  };

  render() {
    return (
      <Fragment>
        <div className={style.rootContainer} id='widget-check-eligibility'>
          <div className={style.eligibleContainer}>
            <div className={style.inputContainer}>
              <Header />
              {this.renderScreens()}
            </div>
          </div>
          <div className={style.infoContainer}>
            <CheckEligibleBenefit />
          </div>
        </div>
        {!isMobile && <Footer />}
        {isMobile && (
          <div className={style.poweredByContainer}>
            <PoweredBy />
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ widgetData }) => {
  const { userActivation, merchantData, metadata } = widgetData || {};
  const {
    sendOTPApiState,
    verifyOTPApiState,
    sendNTBSmsState,
    isPreApproved,
    isEligible,
    isNtbAllowed,
    errorMessage,
  } = userActivation || {};
  return {
    merchantData,
    isPreApproved,
    isNtbAllowed,
    isEligible,
    sendOTPApiState,
    verifyOTPApiState,
    sendNTBSmsState,
    errorMessage,
    metadata,
  };
};

export default connect(
  mapStateToProps,
  { widgetActivationAction },
)(CheckEligible);
