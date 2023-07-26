// @flow
/** @jsx h */
import { h, Component } from 'preact';
import { connect } from 'react-redux';
import withBaseComponent from '../../HOC/withBaseComponent';
import Utils from '../../utils';
import onPaymentSuccess from '../../actions/onPaymentSuccess';
import paymentSuccessAction from '../../actions/onPaymentSuccess/actionType';
import PaymentSuccessMessage from '../../components/paymentCompleteSuccessMessage/paymentSuccessMessage';
import PayLaterSuccessMessage from '../../components/paymentCompleteSuccessMessage/payLaterSuccessMessage';
import { redirectToPaymentInit } from '../../actions/redirectAction';
import BlockResult from '../../components/blockResult';
import style from './style.css';
import type { EmiDetails } from '../../modelType/transactionTypes';
import { tracker } from '../../tracking';

type Props = {
  effectiveMonthlyInstallment: number,
  loanDuration: number,
  merchantId: string,
  selectedLender: Object,
  matches: Object,
  /**
   * @property {string} url to get back to merchant
   */
  returnUrl?: string,
  /**
   * @property {Object} payment-gateway data to submit and redirect
   */
  pgData: Object,
  /**
   * @property {string} mobile number of customer where we send the sms of success transaction
   */
  mobile: string,
  /**
   * @property {string} transaction purchased amount
   */
  purchaseValue: string,
  /**
   * @param {EmiDetails} emi-details of transaction
   */
  selectedEmiDetails: EmiDetails,
  /**
   * @property {Function} to initiate payment-success screen render
   */
  onPaymentSuccess: Function,
};

class PaymentSuccess extends Component<Props> {
  pageKey = 'pv_payment_success_suc';
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
    const { returnUrl, onPaymentSuccess } = this.props;
    if (!returnUrl) {
      tracker.trackApplicationError('Missing Return URL', this.pageKey);
      return redirectToPaymentInit();
    }
    onPaymentSuccess(paymentSuccessAction.initialize);
  }

  submitReturnUrl = () => {
    const { pgData, returnUrl } = this.props;
    this.utils.createAndSubmitDynamicForm(pgData, returnUrl, 0);
  };

  render() {
    const { selectedEmiDetails, mobile, purchaseValue } = this.props || {};
    const { lenderType } = selectedEmiDetails || {};

    return (
      <div class={style.paymentBenefits}>
        <div className={style.successIcon}>
          <i className={`${style.successIconImage} material-icons`}>done</i>
        </div>
        <div className={style.successMessage} id='payment-success'>
          Payment Successful
        </div>
        <div
          className={`${style.infoText} font14 text80`}
          id='payment-success-text'>
          We've sent a confirmation message <br />
          on your <span className='bold-text'>mobile {mobile}</span>
        </div>
        {purchaseValue && purchaseValue.length && (
          <div>
            {lenderType === 'EMI' && (
              <PaymentSuccessMessage
                selectedEmiDetails={selectedEmiDetails}
                purchaseValue={purchaseValue}
              />
            )}
            {lenderType === 'PAY_LATER' && (
              <PayLaterSuccessMessage
                selectedEmiDetails={selectedEmiDetails}
                purchaseValue={purchaseValue}
              />
            )}
          </div>
        )}
        <BlockResult
          visibilityTimeUntilRedirect={3}
          displayMessage='Returning to Merchant website in '
          buttonText='Go to Merchant Now'
          submitFormCallback={this.submitReturnUrl}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ paymentUserData, paymentDetails, config }) => {
  const { selectedEmiDetails, selectedLender, pgData, returnUrl } =
    paymentUserData || {};
  const { mobile, purchaseValue, merchantId } = paymentDetails || {};
  const { effectiveMonthlyInstallment, loanDuration } =
    selectedEmiDetails || {};
  const { txnUuid } = config;
  return {
    txnUuid,
    selectedEmiDetails,
    mobile,
    purchaseValue,
    pgData,
    returnUrl,
    selectedLender,
    merchantId,
    effectiveMonthlyInstallment,
    loanDuration,
  };
};
export default connect(
  mapStateToProps,
  { onPaymentSuccess },
)(withBaseComponent(PaymentSuccess));
