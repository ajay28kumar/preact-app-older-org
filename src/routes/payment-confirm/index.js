// @flow
/** @jsx h */
import { h, Component } from 'preact';
import { connect } from 'react-redux';
import onPaymentConfirm from '../../actions/onPaymentConfirm';
import paymentConfirm from '../../actions/onPaymentConfirm/actionType';
import PaymentContainer from '../../components/paymentConfirm/paymentContainer';
import withBaseComponent from '../../HOC/withBaseComponent';
import { redirectToPaymentInit } from '../../actions/redirectAction';
import type { ApiState } from '../../modelType';
import Spinner from '../../components/spinner/spinner';
import { experimentName } from '../../api/controllers/experimentController';

type Props = {
  isExperimentalUser: boolean,
  effectiveMonthlyInstallment: number,
  loanDuration: number,
  merchantId: string,
  purchaseValue: string,
  selectedLender: Object,
  matches: Object,
  /**
   * @property {string} to get transaction id is available or not
   */
  txnUuid?: string,
  /**
   * @param {ApiState} apiStatus of initiate-second-factor
   */
  initiateAivfApiState: ApiState,
  /**
   * @property {string} error message coming from api
   */
  errorMessage?: string,
  /**
   * @property {Function} payment-confirm function dispatch
   */
  onPaymentConfirm: Function,
  template: string,
};

class PaymentConfirm extends Component<Props> {
  pageKey = 'pv_aivf_page_aivf';
  metadata = {
    lender_name: this.props.selectedLender.lenderName,
    campaign_id: this.props.matches.utm_campaign,
    merchant_id: this.props.merchantId,
    txn_amount: this.props.purchaseValue,
    tenure: this.props.loanDuration,
    emi_amount: this.props.effectiveMonthlyInstallment,
    variant: this.props.isExperimentalUser ? 'B' : 'Default',
  };
  componentDidMount() {
    const { txnUuid } = this.props || {};
    if (!txnUuid) {
      return redirectToPaymentInit();
    }
    this.paymentAction(paymentConfirm.initialize);
    this.paymentAction(paymentConfirm.initiateSecondFactor);
  }

  paymentAction = (actionType: string, ...rest: any) => {
    this.props.onPaymentConfirm(actionType, ...rest);
  };
  render() {
    const { initiateAivfApiState, txnUuid, errorMessage, template } =
      this.props || {};
    if (!txnUuid) {
      return (
        <div className='loaderContainer'>
          <Spinner />
        </div>
      );
    }

    return (
      <PaymentContainer
        pageKey={this.pageKey}
        metadata={this.metadata}
        apiStatus={initiateAivfApiState}
        template={template}
        errorMsg={errorMessage}
        paymentConfirmCallBack={this.paymentAction}
      />
    );
  }
}

const mapStateToProps = ({ paymentUserData, paymentDetails, config }) => {
  const { txnUuid, template, experimentDetails } = config;
  const {
    initiateAivfApiState,
    errorMessage,
    selectedLender,
    selectedEmiDetails,
  } = paymentUserData || {};
  const { lenderType } = selectedLender || {};
  const { merchantId, purchaseValue } = paymentDetails;
  const isExperimentalUser =
    lenderType !== 'PAY_LATER' &&
    merchantId !== '10100' &&
    experimentDetails[experimentName.TRANSACTION_AIVF_POP_UP_VARIANT] === 'B';
  const { effectiveMonthlyInstallment, loanDuration } =
    selectedEmiDetails || {};
  return {
    isExperimentalUser,
    txnUuid,
    initiateAivfApiState,
    errorMessage,
    selectedLender,
    merchantId,
    purchaseValue,
    effectiveMonthlyInstallment,
    loanDuration,
    template,
  };
};

export default connect(
  mapStateToProps,
  { onPaymentConfirm },
)(withBaseComponent(PaymentConfirm));
