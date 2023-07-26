/** @jsx h */
import { Component, h } from 'preact';
import style from '../../style.css';
import MuiInput from '../../../material-ui/muiInput';
import RequestButton from '../../../requestButton';
import { isMobileFormatValid } from '../../../../utils/mobileNumberValidation';
import actionType from '../../../../actions/onRegistrationInit/actionType';
import { connect } from 'react-redux';
import onRegistrationInit from '../../../../actions/onRegistrationInit';
import { tracker, UserActionType } from '../../../../tracking';
import { getNumericValue } from '../../../../utils/stringOperations';
import ActivationVerifyMobile from '../../../activationVerifyMobile';
import { PinChangeType } from '../../../../utils/changePinSource';
import FormField from 'preact-material-components/FormField';
import Checkbox from 'preact-material-components/Checkbox';
import LenderTnCText from '../../../activationVerifyMobile/lenderTnCText';
import Dialog from 'preact-material-components/Dialog';
import TermsAndConditionsContent from '../../../termsAndConditionsContent';
import { apiStatus } from '../../../../actionTypes';

class OtpWidget extends Component {
  state = {
    otpText: '',
    isTermsAccepted: false,
    resendCounter: 30,
  };
  metadata = {
    lender_id: this.props.lenderId,
    merchant_id: this.props.merchantId,
    txn_amount: this.props.purchaseValue,
    tenure: this.props.loanDuration || '',
  };
  componentDidMount() {
    this.initTimer();
  }

  onVerifyMobileAction = (actionType, ...rest) => {
    this.props.onRegistrationInit(
      PinChangeType.ACTIVATION,
      actionType,
      ...rest,
    );
  };

  initTimer = () => {
    this.intervalId = setInterval(this.timer, 1000);
  };

  timer = () => {
    this.setState(
      ({ resendCounter }) => ({
        resendCounter: resendCounter - 1,
      }),
      () => {
        if (this.state.resendCounter === 0) {
          clearInterval(this.intervalId);
        }
      },
    );
  };
  resendOtp = () => {
    const { pageKey } = this.props;
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'Resend OTP Btn',
      pageKey,
      '',
    );
    this.initTimer();
    this.onVerifyMobileAction(actionType.initiateRegistration, {
      otpInitiate: 'manual',
    });
  };

  verifyNumberCallback = (otp) => {
    const { lenderId, mobileNumber: mobile } = this.props || {};
    this.onVerifyMobileAction(actionType.verifyMobileNumber, {
      otp,
      lenderId,
      mobile,
    });
  };

  tncClick = () => {
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'aivf_view_ic_t&c',
      this.props.pageKey,
      this.metadata,
    );
    this.setState({
      isTermsAccepted: !this.state.isTermsAccepted,
    });
  };

  openLenderTnc = () => {
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'aivf_view_lender_t&c',
      this.props.pageKey,
      this.metadata,
    );
    this.tncDialog.MDComponent.show();
  };
  onCloseModel = () => {
    tracker.trackUserInteraction(
      UserActionType.DISMISS,
      'aivf_close_ic_t&c_modal',
      this.props.pageKey,
      this.metadata,
    );
    this.tncDialog.MDComponent.close();
  };

  render() {
    const { errorMessage, pageKey, mobileNumber, lenderId } = this.props;
    const { otpText, isTermsAccepted, resendCounter } = this.state || {};
    return (
      <div className={style.widgetContainer}>
        <div className={`${style.header} font18 bold-text text60 text-center`}>
          Confirm OTP
        </div>
        <div className='font14 text60 text-center'>
          Enter OTP sent on {mobileNumber}
        </div>
        <div className={style.inputContainer}>
          <div>
            <MuiInput
              inputType='text'
              inputName='mobile'
              inputPlaceholder='Enter OTP'
              inputID='mobile'
              pageKey={pageKey}
              className={style.inputBox}
              elementName='OTP'
              metadata={this.metadata}
              maxLength={5}
              minLength={5}
              inputValue={otpText}
              autoFocus={false}
              onChange={(e) =>
                this.setState({ otpText: getNumericValue(e.target.value) })
              }
            />
            <div style={{ textAlign: 'right', marginTop: 8 }}>
              {resendCounter > 0 ? (
                <div className='font12 primary-color bold-text'>
                  {resendCounter} sec
                </div>
              ) : (
                <div
                  className='font12 primary-color bold-text cursorPointer'
                  onClick={() => {
                    this.setState({ resendCounter: 30 }, () =>
                      this.resendOtp(),
                    );
                    tracker.trackUserInteraction(
                      UserActionType.CLICK,
                      'Resend OTP Btn',
                      pageKey,
                      this.metadata,
                    );
                  }}>
                  Resend OTP
                </div>
              )}
            </div>
          </div>
          <RequestButton
            buttonDisabled={otpText.length !== 5 || !isTermsAccepted}
            buttonId='verify-mobile-button'
            loadingMsg='Verifying...'
            pageKey={pageKey}
            buttonWrapperClass={style.submitButton}
            elementName='Verify OTP Btn'
            metadata={this.metadata}
            buttonText='Confirm'
            buttonOnClick={() => this.verifyNumberCallback(otpText)}
            requestStatus={false}
          />
        </div>
        {errorMessage && (
          <div className='inputError' id='error-mobile-input'>
            {errorMessage}
          </div>
        )}
        <div style={{ marginTop: 12 }}>
          <FormField className={style.terms}>
            <div className={style.tncCheckbox}>
              <Checkbox
                id='basic-checkbox'
                onClick={this.tncClick}
                checked={isTermsAccepted}
              />
            </div>
            <div className={style.agreeTnc}>
              <label className='font12 '>
                <span className='text60'>I agree to the</span>
                <span
                  className={`${style.tncHighlight} bold-text primary-color`}
                  onClick={this.openLenderTnc}>
                  Terms & Conditions
                </span>
                <LenderTnCText lenderId={lenderId} />
              </label>
            </div>
          </FormField>
        </div>
        <Dialog
          ref={(tncDialog) => {
            this.tncDialog = tncDialog;
          }}
          className='tnc-modal'>
          <TermsAndConditionsContent
            lenderId={lenderId}
            onCloseCallback={this.onCloseModel}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({
  config,
  registrationUserData,
  activationInit,
  paymentDetails,
  paymentUserData,
}) => {
  const { activationId } = config;
  const { errorMessage } = activationInit;
  const { lenderId, mobile } = registrationUserData;
  const { purchaseValue, merchantId } = paymentDetails || {};
  const { selectedEmiDetails } = paymentUserData;
  const { loanDuration } = selectedEmiDetails || {};

  return {
    errorMessage,
    activationId,
    lenderId,
    mobile,
    purchaseValue,
    merchantId,
    loanDuration,
  };
};

export default connect(
  mapStateToProps,
  { onRegistrationInit },
)(OtpWidget);
