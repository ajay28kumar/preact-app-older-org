/** @jsx h */
import { h, Component, Fragment } from 'preact';
import MuiInput from '../../../../material-ui/muiInput';
import style from '../../style.css';
import {
  getNumericValue,
  hashedMobileNumber,
} from '../../../../../utils/stringOperations';
import RequestButton from '../../../../requestButton';
import { apiStatus } from '../../../../../actionTypes';
import { tracker } from '../../../../../tracking';

class EnterMobileNumber extends Component {
  render() {
    const {
      metadata,
      pageKey,
      mobileNumber,
      errorMessage,
      updateMobileNumber,
      sendOTP,
      contactNumber,
      sendOTPApiState,
    } = this.props || {};
    return (
      <div className={style.bodyContainer}>
        {contactNumber ? (
          <Fragment>
            <div className={style.messageContainer}>
              <img
                src='https://iccdn.in/img/widget-img/ic-widget-warning-outline.svg'
                alt='help'
                className={style.warningIcon}
              />
              <div className='font14 semi-bold-text'>
                {hashedMobileNumber(contactNumber)} is not currently
                pre-approved for InstaCred Cardless EMI
              </div>
            </div>
            <div className='font16'>
              <b>Try another mobile number</b> to check the Cardless EMI status
              with your bank
            </div>
          </Fragment>
        ) : (
          <div className='font16 text80' id='check-eligibility-sub-header'>
            Enter your bank registered mobile number to check Cardless EMI
            eligibility
          </div>
        )}
        <div className={style.formContainer}>
          <MuiInput
            inputID='enter-mobile-input'
            inputType='tel'
            className={style.verifyNumberInputBox}
            inputPlaceholder='Enter mobile'
            inputValue={mobileNumber}
            maxLength={10}
            minLength={10}
            elementName='enter_mobile'
            metadata={metadata}
            pageKey={pageKey}
            onChange={(e) => {
              const contactNumber = getNumericValue(e.target.value);
              return updateMobileNumber(contactNumber);
            }}
          />
          <div className={style.otpDescription}>
            {errorMessage ? (
              <div className='inputError' id='widget-enter-mobile'>
                {errorMessage}
              </div>
            ) : (
              <div
                className='font12 text60'
                id='check-eligibility-otp-sub-text'>
                OTP will be sent on this number
              </div>
            )}
          </div>
          <RequestButton
            buttonId='sendOtpButton'
            loadingMsg='Please Wait..'
            buttonDisabled={!(mobileNumber.length === 10)}
            buttonOnClick={sendOTP}
            pageKey={pageKey}
            metadata={metadata}
            elementName='send_otp'
            buttonText='Check'
            buttonWrapperClass={style.checkButton}
            requestStatus={sendOTPApiState === apiStatus.INITIATED}
          />
        </div>
      </div>
    );
  }
}

export default EnterMobileNumber;
