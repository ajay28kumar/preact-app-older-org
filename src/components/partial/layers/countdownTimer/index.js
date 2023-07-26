/** @jsx h */
import { Component, h } from 'preact';
import style from './style.css';
import { tracker } from '../../../../tracking';
import paymentInitAction from '../../../../actions/onPaymentInit/actionType';

class CountdownTimer extends Component {
  state = {
    timeLeft: this.props.remainingTimeSeconds,
    shouldDisplayTimer: false,
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
      ({ timeLeft }) => ({
        timeLeft: timeLeft - 1,
      }),
      () => {
        if (this.state.timeLeft <= 120) {
          this.setState(
            { shouldDisplayTimer: true },
            () => this.state.timeLeft === 120 && this.sendTracking(),
          );
        }
        if (this.state.timeLeft <= 0) {
          clearInterval(this.intervalId);
          this.setState({ shouldDisplayTimer: false });
          this.props.onPaymentInit(paymentInitAction.onTransactionTimeOut);
        }
      },
    );
  };

  sendTracking = () => {
    tracker.trackImpression('Transaction Timer', this.props.pageKey);
  };
  render() {
    const { timeLeft, shouldDisplayTimer } = this.state || {};
    if (!shouldDisplayTimer) {
      return null;
    }
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const minuteDisplay = String(minutes).padStart(2, '0');
    const secondDisplay = String(seconds).padStart(2, '0');
    return (
      <div className={style.timerContainer}>
        <img
          src='https://iccdn.in/img/ic-timer.png'
          className={style.timerImage}
          alt='timer'
        />
        <div className={`font14`}>
          Transaction timeout in{' '}
          <span className='bold-text errorColor'>
            {minuteDisplay}:{secondDisplay} Min
          </span>
        </div>
      </div>
    );
  }
}

export default CountdownTimer;
