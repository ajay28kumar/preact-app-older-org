// @flow
/** @jsx h */
import { h, Component } from 'preact';
import { connect } from 'react-redux';
import withBaseComponent from '../../HOC/withBaseComponent';
import onPaymentFailure from '../../actions/onPaymentFailure';
import paymentFailureAction from '../../actions/onPaymentFailure/actionType';
import BlockResult from '../../components/blockResult';
import Utils from '../../utils';
import style from './style.css';
import { tracker } from '../../tracking';

type Props = {
  effectiveMonthlyInstallment: number,
  loanDuration: number,
  merchantId: string,
  purchaseValue: string,
  selectedLender: Object,
  matches: Object,
  /**
   * @property {string} url to get back to merchant
   */
  returnUrl: string,
  /**
   * @property {string} errorMessage description (why transaction failed?)
   */
  errorMessage?: string,
  /**
   * @property {Object} payment-gateway data to submit and redirect
   */
  pgData: Object,
  /**
   * @property {Function} to initiate payment-failure screen render
   */
  onPaymentFailure: Function,
};

class PaymentFailure extends Component<Props> {
  pageKey = 'pv_payment_fail_suc';
  metadata = {
    lender_name: this.props.selectedLender.lenderName,
    campaign_id: this.props.matches.utm_campaign,
    merchant_id: this.props.merchantId,
    txn_amount: this.props.purchaseValue,
    tenure: this.props.loanDuration,
    emi_amount: this.props.effectiveMonthlyInstallment,
  };
  utils = new Utils();

  componentDidMount() {
    const { returnUrl, onPaymentFailure } = this.props;
    onPaymentFailure(paymentFailureAction.initialize);
    if (!returnUrl) {
      tracker.trackApplicationError('Missing Return URL', this.pageKey);
    }
  }

  submitReturnUrl = () => {
    const { pgData, returnUrl } = this.props;
    if (returnUrl) {
      this.utils.createAndSubmitDynamicForm(pgData, returnUrl, 0);
    }
  };

  render() {
    const { errorMessage } = this.props || {};
    const errorMsg =
      errorMessage ||
      'Sorry! We are not able to process your payment. For more, please contact us at contact@flexmoney.in';
    return (
      <div className={style.paymentBenefits}>
        <div className={`${style.errorIcon} material-icons`}>error</div>
        <div className='font20 bold-text errorColor' id='payment-failure'>
          Payment Failed
        </div>
        <div className={style.errorMessageContainer}>
          <div className={`${style.errorMessage} font14`} id='error-message'>
            <span className='text60 bold-text'>{errorMsg}</span>
          </div>
        </div>
        <BlockResult
          visibilityTimeUntilRedirect={5}
          displayMessage='Returning to Merchant website in '
          buttonText='Go to Merchant Now'
          submitFormCallback={this.submitReturnUrl}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ paymentUserData, paymentDetails }) => {
  const {
    selectedEmiDetails,
    selectedLender,
    pgData,
    returnUrl,
    errorMessage,
  } = paymentUserData || {};
  const { purchaseValue, merchantId } = paymentDetails || {};
  const { effectiveMonthlyInstallment, loanDuration } =
    selectedEmiDetails || {};
  return {
    pgData,
    returnUrl,
    errorMessage,
    purchaseValue,
    selectedLender,
    merchantId,
    effectiveMonthlyInstallment,
    loanDuration,
  };
};
export default connect(
  mapStateToProps,
  { onPaymentFailure },
)(withBaseComponent(PaymentFailure));
