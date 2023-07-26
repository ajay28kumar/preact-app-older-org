//@flow
/** @jsx h */
import { h, Component } from 'preact';
import { connect } from 'react-redux';
import FormField from 'preact-material-components/FormField';
import Checkbox from 'preact-material-components/Checkbox';
import Dialog from 'preact-material-components/Dialog';
import MuiInput from '../material-ui/muiInput';
import { getNumericValue } from '../../utils/stringOperations';
import LenderTnCText from './lenderTnCText';
import RequestButton from '../requestButton';
import { apiStatus } from '../../actionTypes';
import TermsAndConditionsContent from '../termsAndConditionsContent';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Checkbox/style.css';
import style from '../../routes/activation-verify-mobile/style.css';
import ExitLayer from '../common/exitLayer';
import VerifyMobileHeader from './header';
import withTerminalApiResponse from '../../HOC/withTerminalApiResponse';
import type { ApiState } from '../../modelType';
import { tracker, UserActionType } from '../../tracking';

type State = {
  otp: string,
  isTermsAccepted: boolean,
  resendCounter: number,
};

type Props = {
  isTncAccepted: boolean,
  pageKey: string,
  lenderId: string,
  verifyMobileState: ApiState,
  errorMessage?: string,
  metadata: Object,
  resendOtp: Function,
};

class ActivationVerifyMobile extends Component<Props, State> {
  state = {
    otp: '',
    isTermsAccepted: this.props.isTncAccepted,
    resendCounter: 30,
  };

  componentDidMount() {
    this.initTimer();
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
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
    const { pageKey, resendOtp, metadata } = this.props;
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'ap_resend_otp',
      pageKey,
      metadata,
    );
    resendOtp();
    this.initTimer();
  };

  tncClick = () => {
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'ap_accept_t&c',
      this.props.pageKey,
      this.props.metadata,
    );
    this.setState({
      isTermsAccepted: !this.state.isTermsAccepted,
    });
  };

  openLenderTnc = () => {
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'ap_view_t&c',
      this.props.pageKey,
      this.props.metadata,
    );
    this.tncDialog.MDComponent.show();
  };

  onCloseModel = () => {
    tracker.trackUserInteraction(
      UserActionType.DISMISS,
      'ap_close_t&c',
      this.props.pageKey,
      this.props.metadata,
    );
    this.tncDialog.MDComponent.close();
  };
  render() {
    const {
      lenderId,
      verifyMobileState,
      errorMessage,
      pageKey,
      campaignId,
    } = this.props;
    const { otp, isTermsAccepted } = this.state;
    return (
      <div className='activation-container'>
        <ExitLayer preventBrowserBack={false} pageKey={pageKey} />
        <div className={style.mobileContainer}>
          <div className='font20 text80 bold-text text-center'>
            {' '}
            OTP Confirmation
          </div>
        </div>
        <div className={style.titleDescription}>
          <VerifyMobileHeader />
        </div>
        <div className={style.inputContainer}>
          <MuiInput
            outlined
            autoFocus
            isError={!!errorMessage}
            inputType='tel'
            inputName='otp'
            inputPlaceholder='Enter OTP'
            inputID='otp'
            inputValue={this.state.otp}
            className='otp'
            maxLength={5}
            minLength={5}
            pageKey={pageKey}
            metadata={this.props.metadata}
            elementName='ap_enter_otp'
            onChange={(e) => {
              const otp = getNumericValue(e.target.value);
              this.setState({ otp });
            }}
          />
          <div style={{ textAlign: 'right', marginTop: 8 }}>
            {this.state.resendCounter > 0 ? (
              <div className='font12 primary-color bold-text'>
                {this.state.resendCounter} sec
              </div>
            ) : (
              <div
                className='font12 primary-color bold-text cursorPointer'
                onClick={() => {
                  this.setState({ resendCounter: 30 }, () => this.resendOtp());
                }}>
                Resend OTP
              </div>
            )}
          </div>
          <div className='inputError' id='otpErrorDiv'>
            {errorMessage}
          </div>
          {!this.props.isTncAccepted && (
            <div style={{ marginTop: 12 }}>
              <FormField className={style.terms}>
                <div className={style.tncCheckbox}>
                  <Checkbox
                    id='basic-checkbox'
                    onClick={this.tncClick}
                    checked={this.state.isTermsAccepted}
                  />
                </div>
                <div className={style.agreeTnc}>
                  <label className='font12 '>
                    <span className='text60'>I agree to the</span>
                    <span
                      className={`${
                        style.tncHighlight
                      } bold-text primary-color`}
                      onClick={this.openLenderTnc}>
                      Terms & Conditions.
                    </span>
                  </label>
                </div>
              </FormField>
            </div>
          )}
        </div>
        <RequestButton
          buttonId='verifyOtpButton'
          loadingMsg='Verifying your number...'
          buttonDisabled={!(otp.length === 5 && isTermsAccepted)}
          buttonOnClick={() => this.props.verifyNumberCallback(otp)}
          pageKey={this.props.pageKey}
          elementName='ap_verify_otp'
          metadata={this.props.metadata}
          buttonText='VERIFY MOBILE TO START'
          requestStatus={verifyMobileState === apiStatus.INITIATED}
        />
        {/*  TODO: migrate this to global modal*/}
        <Dialog
          ref={(tncDialog) => {
            this.tncDialog = tncDialog;
          }}
          className='tnc-modal'>
          <TermsAndConditionsContent
            lenderId='instacred'
            onCloseCallback={this.onCloseModel}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ registrationUserData, activationInit }) => {
  const { mobile, lenderId } = registrationUserData;
  const { verifyMobileState, errorMessage } = activationInit;
  return {
    mobile,
    lenderId,
    verifyMobileState,
    errorMessage,
  };
};

export default connect(mapStateToProps)(
  withTerminalApiResponse(ActivationVerifyMobile),
);
