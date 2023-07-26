/** @jsx h */
import { h, Component } from 'preact';
import style from '../../style.css';
import MuiInput from '../../../material-ui/muiInput';
import RequestButton from '../../../requestButton';
import { isMobileFormatValid } from '../../../../utils/mobileNumberValidation';
import actionType from '../../../../actions/onRegistrationInit/actionType';

const MobileNumberWidget = (props) => {
  const {
    seeMoreClicked,
    errorMsg,
    campaignId,
    pageKey,
    mobileNumber,
    updateMobileNumber,
    activationActionCallBack,
  } = props;
  return (
    <div className={style.widgetContainer}>
      <div className={`${style.header} font18 bold-text text60 text-center`}>
        {seeMoreClicked ? 'Login to see more' : 'Get Started Now!'}
      </div>
      <div className='font14 text60 text-center'>
        {seeMoreClicked
          ? 'To see more, please verify your mobile number'
          : 'Login with your mobile registered with Kotak Mahindra Bank'}
      </div>
      <div className={style.inputContainer}>
        <MuiInput
          inputType='text'
          inputName='mobile'
          inputPlaceholder='Enter Mobile Number'
          inputID='mobile'
          pageKey={pageKey}
          className={style.inputBox}
          elementName='User Mobile'
          maxLength={10}
          minLength={10}
          inputValue={mobileNumber}
          autoFocus={false}
          onChange={updateMobileNumber}
        />
        <RequestButton
          buttonDisabled={mobileNumber.length !== 10}
          buttonId='verify-mobile-button'
          loadingMsg='Verifying...'
          pageKey={pageKey}
          buttonWrapperClass={style.submitButton}
          elementName='Check PA Status Btn'
          buttonText='Login'
          buttonOnClick={() => {
            !isMobileFormatValid(mobileNumber)
              ? activationActionCallBack(
                  actionType.dispatchActivationErrorMessage,
                  {
                    message: 'Mobile Number Invalid',
                  },
                )
              : activationActionCallBack(actionType.initiateRegistration, {
                  mobile: mobileNumber,
                  campaignId,
                });
          }}
          requestStatus={false}
        />
      </div>
      {errorMsg && (
        <div className='inputError' id='error-mobile-input'>
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default MobileNumberWidget;
