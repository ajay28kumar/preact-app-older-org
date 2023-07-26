// @flow
/** @jsx h */
import { h, Component } from 'preact';
import PaymentVerifyMobile from '../paymentSecondFactor/paymentVerifyMobile';
import withTerminalApiResponse from '../../HOC/withTerminalApiResponse';
import style from './style.css';
import type { ApiState } from '../../modelType';
import PaymentVerifyAIVF from '../paymentSecondFactor/paymentVerifyAivf';
import ExitLayer from '../common/exitLayer';
import CancelTransactionButton from '../cancelTransactionButton';

type Props = {
  /**
   * @property {string}
   */
  pageKey: string,
  /**
   * @param {ApiState} confirm second-factor state
   */
  confirmAivfApiState: ApiState,
  metadata: Object,
  /**
   * @property {Function}
   * @callback function passed from payment-confirm component
   */
  paymentConfirmCallBack: Function,
};

type State = {
  /**
   * @property {boolean} termsAndCondition has been accepted or not
   */
  isTermsAccepted: boolean,
};

class PaymentContainer extends Component<Props, State> {
  state = {
    isTermsAccepted: false,
  };

  acceptLenderTncCallback = (isTermsAccepted: boolean) => {
    this.setState({
      isTermsAccepted,
    });
  };

  render() {
    const { pageKey, metadata, paymentConfirmCallBack } = this.props || {};
    return (
      <div className={style.paymentConfirmContainer}>
        <ExitLayer pageKey={pageKey} exitPath={''} />
        <div className='transaction-header font20 bold-text'>
          Transaction Confirmation
        </div>
        <PaymentVerifyAIVF
          isTermsAccepted={this.state.isTermsAccepted}
          pageKey={pageKey}
          metadata={metadata}
          paymentConfirmCallBack={paymentConfirmCallBack}
        />
        <PaymentVerifyMobile
          isTermsAccepted={this.state.isTermsAccepted}
          pageKey={pageKey}
          metadata={metadata}
          acceptLenderTncCallback={this.acceptLenderTncCallback}
          paymentConfirmCallBack={paymentConfirmCallBack}
        />
        <CancelTransactionButton metadata={metadata} />
      </div>
    );
  }
}

export default withTerminalApiResponse(PaymentContainer);
