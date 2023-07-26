/** @jsx h */
import { h, Component } from 'preact';
import MuiInput from '../../../../material-ui/muiInput';
import RequestButton from '../../../../requestButton';
import ResendOTP from './resendOTP';
import {
  getNumericValue,
  hashedMobileNumber,
} from '../../../../../utils/stringOperations';
import style from '../../style.css';
import { apiStatus } from '../../../../../actionTypes';
import InstacredTnC from '../../../../common/instacredTnC';

class VerifyMobileNumber extends Component {
  state = {
    otp: '',
    isTermsAccepted: false,
  };
  render() {
    const { otp, isTermsAccepted } = this.state || {};
    const {
      metadata,
      pageKey,
      verifyOTP,
      errorMessage,
      mobileNumber,
      resendOTP,
      updateMobileNumber,
      verifyOTPApiState,
      trackUserAction,
    } = this.props || {};
    return (
      <div className={style.bodyContainer}>
        <div className={style.headerText}>
          <div
            className='font16 text80'
            id='verify-mobile-number-otp-sub-header'>
            Enter OTP Sent to <b>{hashedMobileNumber(mobileNumber)}</b>
          </div>
          <img
            id='verify-mobile-number-edit-number-icon'
            src='https://iccdn.in/img/widget-img/ic-widget-edit-phone.svg'
            className={style.editIcon}
            onClick={() => {
              trackUserAction('edit_number', pageKey, {
                ...metadata,
              });
              updateMobileNumber();
            }}
          />
        </div>
        <div className={style.formContainer}>
          <MuiInput
            id='verify-mobile-number-otp-field'
            inputType='tel'
            className={style.verifyNumberInputBox}
            inputPlaceholder='OTP'
            inputValue={otp}
            maxLength={5}
            minLength={5}
            elementName='enter_otp'
            metadata={metadata}
            pageKey={pageKey}
            onChange={(e) => {
              const text = e.target.value;
              const otpNumber = getNumericValue(text || '');
              this.setState({ otp: otpNumber });
            }}
          />
          {errorMessage && (
            <div className='inputError' id='widget-verify-mobile'>
              {errorMessage}
            </div>
          )}
          <div className={style.resendOtpContainer}>
            <ResendOTP resendOTP={resendOTP} />
          </div>
          <InstacredTnC
            isTermsAccepted={isTermsAccepted}
            onClickTermsAccepted={(isTermsAccepted) => {
              trackUserAction('accept_t&c', pageKey, {
                ...metadata,
              });
              this.setState({ isTermsAccepted });
            }}
            pageKey={pageKey}
            metadata={metadata}
            trackUserAction={trackUserAction}
          />
          <RequestButton
            metadata={metadata}
            pageKey={pageKey}
            buttonId='sendOtpButton'
            loadingMsg='Please Wait..'
            buttonDisabled={!(isTermsAccepted && otp.length === 5)}
            buttonOnClick={() => verifyOTP(otp)}
            elementName='check_PA_btn'
            buttonText='Check'
            buttonWrapperClass={style.checkButton}
            requestStatus={verifyOTPApiState === apiStatus.INITIATED}
          />
        </div>
      </div>
    );
  }
}

export default VerifyMobileNumber;
