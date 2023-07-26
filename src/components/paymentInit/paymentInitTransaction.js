// @flow
/** @jsx h */
import { h, Component } from 'preact';
import paymentInitAction from '../../actions/onPaymentInit/actionType';
import { route } from 'preact-router';
import PaymentInitContainer from './paymentInitContainer';
import { apiStatus } from '../../actionTypes';
import { paymentFailureRoute } from '../../alias/paymentRoutes';

import type { ApiState } from '../../modelType';

type Props = {
  /**
   * merchantId is gatewayMerchantId from pg
   * @property {string}
   */
  merchantId: string,
  /**
   * mobile is users contact number (optional)
   * @property {string}
   */
  mobile?: string,
  /**
   * transactionInfoApiState is current apiState
   * @param {ApiState}
   * @enum
   */
  transactionInfoApiState: ApiState,
  /**
   * transactionInfoPreSelectedApiState is current apiState to inform that lender and emi has been preselected from pg itself or not
   * @param {ApiState}
   * @enum
   */
  transactionInfoPreSelectedApiState: ApiState,
  /**
   * errorMessage error message from server
   */
  errorMessage?: string,

  template: string,
  /**
   * matches is query parameter from url
   */
  matches: {
    uuId: string,
    utm_campaign?: string,
  },
  /**
   * onPaymentInit dispatch function from actions
   * @property {Function}
   */
  onPaymentInit: Function,
  /**
   * @property {Function} select lenderList dispatch function
   */
  onPaymentLenderList: Function,
};

/**
 * Some documented component
 *
 * @component
 * @example
 * const merchantId = '00004'
 * const mobile = '9867997821'
 * const transactionInfoApiState='success';
 * const matches = {
 *     uuId: '',
 *     utm_campaign: ''
 * };
 * const onPaymentInit = () =>{...}
 * return (
 *   <PaymentInitTransaction merchantId={merchantId} mobile={mobile}
 *    transactionInfoApiState={transactionInfoApiState} matches={matches}
 *    onPaymentInit={onPaymentInit}/>
 * )
 */

export class PaymentInitTransaction extends Component<Props> {
  pageKey = 'pv_payment_init';

  componentDidMount() {
    this.initApp();
  }
  initApp = () => {
    const { matches, onPaymentInit } = this.props;
    const { uuId: txnUuid, utm_campaign: utmCampaign } = matches;
    if (txnUuid) {
      onPaymentInit(paymentInitAction.initialize, {
        txnUuid,
        utmCampaign,
      });
    } else {
      route(paymentFailureRoute.path, true);
    }
  };

  paymentInitCallBack = (actionType: string, ...rest: any) => {
    const { onPaymentInit } = this.props;
    onPaymentInit(actionType, ...rest);
  };
  lenderActionCallBack = (actionType: string, ...actionPayload: any) => {
    this.props.onPaymentLenderList(actionType, ...actionPayload);
  };

  render() {
    const {
      merchantId,
      mobile,
      transactionInfoApiState,
      transactionInfoPreSelectedApiState,
      errorMessage,
      template,
    } = this.props;
    return (
      <PaymentInitContainer
        transactionInfoPreSelectedApiState={
          transactionInfoPreSelectedApiState === apiStatus.SUCCESS
        }
        lenderActionCallBack={this.lenderActionCallBack}
        errorMsg={errorMessage}
        pageKey={this.pageKey}
        apiStatus={transactionInfoApiState}
        loadingText='Getting your Transaction details...'
        merchantId={merchantId}
        mobile={mobile}
        paymentInitCallBack={this.paymentInitCallBack}
        template={template}
      />
    );
  }
}
