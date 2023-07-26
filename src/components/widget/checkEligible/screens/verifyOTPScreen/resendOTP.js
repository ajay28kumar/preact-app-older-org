import { h, Component } from 'preact';

class ResendOTP extends Component {
  state = {
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
    const { resendOTP } = this.props;
    resendOTP();
    this.initTimer();
  };
  render() {
    const { resendCounter } = this.state || {};
    return (
      <div>
        {resendCounter === 0 ? (
          <div
            onClick={() =>
              this.setState({ resendCounter: 30 }, () => this.resendOtp())
            }
            className='text-color font14'>
            Resend OTP
          </div>
        ) : (
          <div className='text80 bold-text font14'>{resendCounter} sec</div>
        )}
      </div>
    );
  }
}

export default ResendOTP;
