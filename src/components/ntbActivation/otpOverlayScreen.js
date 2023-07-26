/** @jsx h */
//@flow
import { h, Component } from 'preact';
import actionType from '../../actions/ntbAction/actionType';
import MuiInput from '../material-ui/muiInput';
import { getNumericValue } from '../../utils/stringOperations';
import RequestButton from '../requestButton';
import { tracker, UserActionType } from '../../tracking';
import style from '../../routes/ntb-activation/style.css';
import InstacredTnC from '../common/instacredTnC';

type Props = {
  pageKey: string,
  mobileNo: string,
  ntbAction: Function,
};

type State = {
  otp: string,
  resendCounter: number,
  isTermsAccepted: boolean,
};

class OtpOverlayScreen extends Component<Props, State> {
  state = {
    otp: '',
    resendCounter: 30,
    isTermsAccepted: false,
  };
  componentDidMount() {
    this.initTimer();
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
    this.setState(
      {
        otp: '',
        resendCounter: 30,
      },
      this.initTimer,
    );
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'Resend OTP Btn',
      this.pageKey,
      '',
    );
    const { channel, merchantId, mobileNo } = this.props || {};
    this.props.ntbAction(actionType.sendOTP, {
      mobile: mobileNo,
      merchantId,
      channel,
    });
  };

  resetTimer = () => {
    this.setState({
      resendOtpVisible: true,
    });
  };
  render() {
    const { pageKey, mobileNo, channel, ntbAction } = this.props || {};
    const { isTermsAccepted } = this.state;
    return (
      <div>
        <div className={style.overlayScreen}>&nbsp;</div>
        <div>
          <div className={style.otpContainer}>
            <div className={style.closeIconContainer}>
              <img
                src='https://iccdn.in/ic_close.svg'
                onClick={() => {
                  return ntbAction(actionType.closeOtpOverLayScreen, {});
                }}
              />
            </div>
            <div className={style.otpSection}>
              <div className='font20 text-center bold-text text80'>
                Enter OTP to continue
              </div>
              <div className={`font14 ${style.enterOtpHeader}`}>
                <span className='text80'>Enter OTP sent on</span>{' '}
                <span className='bold-text'>{mobileNo}</span>
              </div>
              <div className={style.otpVerifyContainer}>
                <div>
                  <MuiInput
                    inputID='otp'
                    inputPlaceholder='Enter 5 Digit OTP'
                    pageKey={pageKey}
                    maxLength={5}
                    minLength={5}
                    inputValue={this.state.otp}
                    inputType='tel'
                    className={style.otpInputBox}
                    onChange={(e) => {
                      const otp = getNumericValue(e.target.value);
                      this.setState({ otp });
                    }}
                  />
                  <div style={{ textAlign: 'right', margin: 8 }}>
                    {this.state.resendCounter > 0 ? (
                      <div className='font12 primary-color bold-text'>
                        {this.state.resendCounter} sec
                      </div>
                    ) : (
                      <div
                        className='font12 linkColor bold-text'
                        onClick={this.resendOtp}>
                        Resend OTP
                      </div>
                    )}
                  </div>
                </div>
                <InstacredTnC
                  isTermsAccepted={isTermsAccepted}
                  onClickTermsAccepted={(isTermsAccepted) =>
                    this.setState({ isTermsAccepted })
                  }
                  pageKey={pageKey}
                />
                <div className={style.otpVerifyBox}>
                  <RequestButton
                    buttonDisabled={
                      this.state.otp.length !== 5 || !isTermsAccepted
                    }
                    buttonId='eligibility-button'
                    loadingMsg='Verifying...'
                    pageKey={pageKey}
                    buttonWrapperClass={style.otpSubmitButton}
                    elementName='Verify OTP'
                    buttonText='Verify'
                    buttonOnClick={() => {
                      return ntbAction(actionType.verifyOTP, {
                        mobile: mobileNo,
                        otp: this.state.otp,
                        channel,
                      });
                    }}
                    requestStatus={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OtpOverlayScreen;
