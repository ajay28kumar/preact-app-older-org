/** @jsx h */
import { Component, h } from 'preact';
import style from '../../style.css';
import Header from '../../header';
import VerifyMobileNumber from './verifyMobileNumber';
import actionType from '../../../../../actions/widgetActivationAction/actionType';
import CheckEligibleBenefit from './checkEligibleBenefit';
import { isMobile } from '../../../../../utils/helper';
import withBaseComponent from '../../../../../HOC/withBaseComponent';

class VerifyOTPScreen extends Component {
  pageKey = 'pv_otp';
  metadata = this.props.metadata;

  render() {
    const {
      mobileNumber,
      errorMessage,
      amount,
      initScreen,
      checkEligibleAction,
      verifyOTPApiState,
      trackUserAction,
    } = this.props || {};
    return (
      <VerifyMobileNumber
        pageKey={this.pageKey}
        metadata={this.metadata}
        mobileNumber={mobileNumber}
        errorMessage={errorMessage}
        updateMobileNumber={initScreen}
        verifyOTPApiState={verifyOTPApiState}
        trackUserAction={trackUserAction}
        resendOTP={() => {
          trackUserAction('resend _OTP', this.pageKey, this.metadata);
          checkEligibleAction(actionType.sendOTP, {
            mobile: mobileNumber,
            channel: 'WIDGET',
          });
        }}
        verifyOTP={(otp) => {
          checkEligibleAction(actionType.verifyOTP, {
            mobile: mobileNumber,
            otp,
            amount,
            channel: 'WIDGET',
          });
        }}
      />
    );
  }
}

export default withBaseComponent(VerifyOTPScreen);
