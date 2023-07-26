// @flow
/** @jsx h */
import { h, Component, Fragment } from 'preact';
import { connect } from 'react-redux';
import MuiInput from '../../material-ui/muiInput';
import { apiStatus } from '../../../actionTypes';
import paymentConfirm from '../../../actions/onPaymentConfirm/actionType';
import style from '../style.css';
import type { AivfType, ApiState } from '../../../modelType';
import TermsAndConditions from '../termsAndConditions';
import SubmitButton from '../../submitButton';
import { route } from 'preact-router';
import { paymentSuccessRoute } from '../../../alias/paymentRoutes';
import Spinner from '../../spinner/spinner';
import { tracker, UserActionType } from '../../../tracking';

type Props = {
  /**
   * @property {number} remaining attempts of resend-otp
   */
  attemptsRemaining: number,
  /**
   * @property {string} error message from confirm-transaction
   */
  errorMessage?: string,
  /**
   * @param {AivfType} only in case of NONE so that we can hide stepper in that case
   */
  aivfType: AivfType,
  /**
   * @param {ApiState} State of the AIVF Confirmation API request
   */
  confirmAivfApiState: ApiState,
  /**
   * @param {ApiState} state of the initiate-transaction API request
   */
  initiateTransactionApiState: ApiState,
  /**
   * @param {Array<string>} is list of notes about EMI
   */
  emiNotes: Array<string>,
  /**
   * @param {ApiState} state of the confirm-transaction API request
   */
  confirmOtpApiState: ApiState,
  metadata: Object,
  /**
   * @property {Function}
   * @callback function to resendOtp click
   */
  paymentConfirmCallBack: Function,
  /**
   * @property {Function}
   * @callback update-otp function
   */
  onUpdateOTP: Function,
};

type State = {
  resendCounter: number,
  otpText: string,
  aivfType: AivfType,
};

class PaymentVerifyMobile extends Component<Props, State> {
  state = {
    resendCounter: 30,
    otpText: '',
    aivfType: this.props.aivfType,
  };

  componentDidUpdate(previousProps) {
    const { initiateTransactionApiState, confirmOtpApiState } =
      this.props || {};
    if (
      initiateTransactionApiState === apiStatus.SUCCESS &&
      initiateTransactionApiState !== previousProps.initiateTransactionApiState
    ) {
      this.resetVisibilityOfResendOtp();
    }
    if (
      confirmOtpApiState === apiStatus.SUCCESS &&
      confirmOtpApiState !== previousProps.confirmOtpApiState
    ) {
      this.transactionSuccessAction();
    }
  }
  transactionSuccessAction = () => {
    route(`${paymentSuccessRoute.path}${window.location.search}`, true);
  };
  timer = () => {
    this.setState(
      () => ({
        resendCounter: this.state.resendCounter - 1,
      }),
      () => {
        if (this.state.resendCounter === 0) {
          clearInterval(this.intervalId);
        }
      },
    );
  };

  resetVisibilityOfResendOtp = () => {
    this.setState(
      {
        resendCounter: 30,
      },
      () => (this.intervalId = setInterval(this.timer, 1000)),
    );
  };

  verifyTransaction = () => {
    this.props.paymentConfirmCallBack(paymentConfirm.confirmTransaction, {
      otp: this.state.otpText,
      isLenderTxnAndICRegistrationTnCAccepted: this.props.aivfType === 'NONE',
    });
  };
  render() {
    const {
      isTermsAccepted,
      confirmOtpApiState,
      aivfType,
      mobile,
      paymentConfirmCallBack,
      errorMessage,
      pageKey,
      attemptsRemaining,
      emiNotes,
      initiateTransactionApiState,
      metadata,
      acceptLenderTncCallback,
    } = this.props || {};
    const { otpText } = this.state;

    const isTransactionInitiationIncomplete =
      initiateTransactionApiState !== apiStatus.SUCCESS;
    if (aivfType === 'NONE' && isTransactionInitiationIncomplete) {
      return (
        <div className='loaderContainer'>
          <Spinner />
          <div style={{ margin: 24 }}>Processing your transaction</div>
        </div>
      );
    }
    const additionalTrackingData = {
      ...metadata,
      AIVF_Type: aivfType,
    };
    return (
      <div
        className={`${style.aivfContainer}
        ${aivfType !== 'NONE' ? style.verifyMobileCard : ''} ${
          !isTransactionInitiationIncomplete
            ? style.activePaymentCard
            : style.inactivePaymentCard
        }`}>
        <div className={style.sectionContainer}>
          <div className={style.headerContainer}>
            {aivfType !== 'NONE' && (
              <div className={style.stepContainer}>
                <div
                  className={`${style.stepNumber} ${
                    isTransactionInitiationIncomplete
                      ? style.disabled
                      : `${style.enable} text-color`
                  }`}>
                  2
                </div>
              </div>
            )}
            <div className={style.headerText}>Confirm Transaction</div>
          </div>
          <div className={style.inputContainer}>
            {!isTransactionInitiationIncomplete && (
              <Fragment>
                <div className={style.inputBox}>
                  <div className='font14' style={{ marginBottom: 5 }}>
                    <span className='text60'>Enter OTP sent on </span>
                    <span className='bold-text'>{mobile}</span>
                  </div>
                  <MuiInput
                    isError={
                      confirmOtpApiState === apiStatus.ERROR && errorMessage
                    }
                    disabled={isTransactionInitiationIncomplete}
                    pageKey={pageKey}
                    inputID='otp'
                    elementName={'aivf_input_otp'}
                    metadata={additionalTrackingData}
                    inputPlaceholder='Enter OTP'
                    inputType='tel'
                    className={`otpInputBox ${style.inputWidth} ${
                      otpText.length ? style.letterSpacing : ''
                    }`}
                    maxLength={6}
                    minLength={5}
                    value={otpText}
                    onChange={(e) => {
                      const text = e.target.value;
                      const otpNumber = text ? text.replace(/[^0-9]/g, '') : '';
                      this.setState({ otpText: otpNumber });
                    }}
                  />
                  {confirmOtpApiState === apiStatus.ERROR && errorMessage && (
                    <div className='inputError' id='aivfVerification'>
                      {errorMessage}
                    </div>
                  )}
                  {this.state.resendCounter > 0 ? (
                    <div className={`${style.resendText} text-color bold-text`}>
                      {this.state.resendCounter} sec
                    </div>
                  ) : (
                    <Fragment>
                      {confirmOtpApiState !== apiStatus.INITIATED && (
                        <div
                          className={`${style.resendText} ${
                            attemptsRemaining !== 0
                              ? 'cursorPointer bold-text text-color'
                              : style.disabledText
                          }`}
                          onClick={() => {
                            if (attemptsRemaining !== 0) {
                              this.setState({ resendCounter: 30 }, () =>
                                this.resetVisibilityOfResendOtp(),
                              );
                              tracker.trackUserInteraction(
                                UserActionType.CLICK,
                                'aivf_resend_otp',
                                pageKey,
                                additionalTrackingData,
                              );
                              paymentConfirmCallBack(paymentConfirm.resendOtp);
                            }
                          }}>
                          Resend OTP
                        </div>
                      )}
                    </Fragment>
                  )}
                </div>
                <TermsAndConditions
                  pageKey={pageKey}
                  metadata={additionalTrackingData}
                  acceptLenderTncCallback={acceptLenderTncCallback}
                />
                {emiNotes.map((note) => {
                  return (
                    <div className={`text60 font12 ${style.emiNotes}`}>
                      {note}
                    </div>
                  );
                })}
                <SubmitButton
                  pageKey={pageKey}
                  elementName='aivf_otp_confirm'
                  metadata={additionalTrackingData}
                  className={style.submitButton}
                  buttonDisabled={
                    this.state.otpText.length < 5 || !isTermsAccepted
                  }
                  buttonText='Verify & Confirm'
                  buttonOnClick={this.verifyTransaction}
                  requestStatus={confirmOtpApiState === apiStatus.INITIATED}
                />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ paymentUserData, paymentDetails }) => {
  const {
    aivfType,
    initiateTransactionApiState,
    confirmOtpApiState,
    errorMessage,
    resendOtp,
    selectedLender,
  } = paymentUserData || {};
  const { emiNotes } = selectedLender || {};
  const { mobile } = paymentDetails;
  const { attemptsRemaining } = resendOtp || {};

  return {
    emiNotes: emiNotes || [],
    aivfType,
    mobile,
    initiateTransactionApiState,
    confirmOtpApiState,
    errorMessage,
    attemptsRemaining,
  };
};

export default connect(mapStateToProps)(PaymentVerifyMobile);
