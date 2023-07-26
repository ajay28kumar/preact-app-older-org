// @flow
/** @jsx h */
import { h, Component } from 'preact';
import { connect } from 'react-redux';
import onPaymentLenderList from '../../actions/onPaymentLenderList';
import paymentLenderAction from '../../actions/onPaymentLenderList/actionType';
import LenderLists from '../../components/paymentInit/lenderLists';
import { redirectToPaymentInit } from '../../actions/redirectAction';
import type { LenderDetails } from '../../modelType/transactionTypes';
import Spinner from '../../components/spinner/spinner';
import style from './style.css';
import { getLenderNames } from '../../utils/stringOperations';

type Props = {
  /**
   * @property {boolean} isEligible to get user eligible for credit-line or not
   */
  isEligible: boolean,
  matches: Object,
  merchantId: string,
  purchaseValue: string,
  /**
   * @property {string} transaction uuid to confirm all the existing data in reducer is in correct place
   */
  txnUuid?: string,
  /**
   * @param {Array<LenderDetails>} lenderDetailsList is list of lenders and their EMI
   */
  lenderDetailsList: Array<LenderDetails>,
  /**
   * @property {Function} select lenderList dispatch function
   */
  onPaymentLenderList: Function,
};

class PaymentLenderList extends Component<Props> {
  metadata = {
    campaign_id: this.props.matches.utm_campaign,
    merchant_id: this.props.merchantId,
    txn_amount: this.props.purchaseValue,
    lender_list: getLenderNames(this.props.lenderDetailsList),
  };
  componentDidMount() {
    this.init();
    this.lenderActionCallBack(paymentLenderAction.initialize);
  }
  init = () => {
    const { txnUuid } = this.props || {};
    if (!txnUuid) {
      return redirectToPaymentInit();
    }
  };

  lenderActionCallBack = (actionType: string, ...actionPayload: any) => {
    this.props.onPaymentLenderList(actionType, ...actionPayload);
  };

  render() {
    const { isEligible, lenderDetailsList, txnUuid } = this.props || {};
    if (!txnUuid) {
      return (
        <div className='loaderContainer'>
          <Spinner />
        </div>
      );
    }

    return (
      <div>
        <div className='transaction-header font20 bold-text'>
          Select a lender
        </div>
        <div
          className={`${style.subHeader} font14 bold-text text60 text-center`}>
          You have been pre-approved by the following lenders. Select one to
          continue with the transaction.
        </div>
        <LenderLists
          metadata={this.metadata}
          isEligible={isEligible}
          lenderDetailsList={lenderDetailsList}
          lenderActionCallBack={this.lenderActionCallBack}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ paymentDetails, config }) => {
  const { eligible, lenderDetailsList, merchantId, purchaseValue } =
    paymentDetails || {};
  const { txnUuid } = config;
  return {
    isEligible: eligible,
    lenderDetailsList,
    txnUuid,
    merchantId,
    purchaseValue,
  };
};

export default connect(
  mapStateToProps,
  { onPaymentLenderList },
)(PaymentLenderList);
