/** @jsx h */
import { Component, h } from 'preact';
import actionType from '../../../../../actions/widgetActivationAction/actionType';
import EnterMobileNumber from './enterMobileNumber';
import withBaseComponent from '../../../../../HOC/withBaseComponent';

class EnterMobileNumberScreen extends Component {
  pageKey = 'pv_mobile';
  metadata = this.props.metadata;

  render() {
    const {
      errorMessage,
      contactNumber,
      mobileNumber,
      checkEligibleAction,
      updateMobileNumber,
      sendOTPApiState,
      trackUserAction,
    } = this.props || {};
    return (
      <EnterMobileNumber
        pageKey={this.pageKey}
        metadata={this.metadata}
        errorMessage={errorMessage}
        contactNumber={contactNumber}
        mobileNumber={mobileNumber}
        updateMobileNumber={updateMobileNumber}
        sendOTPApiState={sendOTPApiState}
        trackUserAction={trackUserAction}
        sendOTP={() => {
          checkEligibleAction(actionType.sendOTP, {
            channel: 'WIDGET',
            mobile: mobileNumber,
            amount: 8000,
          });
        }}
      />
    );
  }
}

export default withBaseComponent(EnterMobileNumberScreen);
