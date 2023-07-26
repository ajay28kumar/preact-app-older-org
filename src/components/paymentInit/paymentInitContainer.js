// @flow
/** @jsx h */
import { h } from 'preact';
import withTerminalApiResponse from '../../HOC/withTerminalApiResponse';
import Redirect from '../redirect';
import InitiatePayment from './InitiatePayment';
import { paymentEnterMobileRoute } from '../../alias/paymentRoutes';
import { tracker } from '../../tracking';

type Props = {
  /**
   * mobile is users contact number (optional)
   * @property {string}
   */
  mobile?: string,
  /**
   * transactionInfoPreSelectedApiState tells that emi and lender has already been selected from pg
   * @property {boolean}
   */
  transactionInfoPreSelectedApiState: boolean,
  /**
   * @property {string}
   */
  pageKey: string,
  /**
   * merchantId is gatewayMerchantId from pg
   * @property {string}
   */
  merchantId: string,
  /**
   * paymentInitCallBack is callback function from parent Component
   * @callback
   * @property {Function}
   */
  paymentInitCallBack: Function,
};

export const PaymentInitContainer = ({
  mobile,
  transactionInfoPreSelectedApiState,
  pageKey,
  merchantId,
  paymentInitCallBack,
  lenderActionCallBack,
}: Props) => {
  merchantIdTracking({ pageKey, merchantId });

  if (!mobile || !mobile.length) {
    return (
      <Redirect
        to={`${paymentEnterMobileRoute.path}${window.location.search}`}
        replace={true}
      />
    );
  } else {
    return (
      <InitiatePayment
        transactionInfoPreSelectedApiState={transactionInfoPreSelectedApiState}
        paymentInitCallBack={paymentInitCallBack}
        lenderActionCallBack={lenderActionCallBack}
      />
    );
  }
};
const merchantIdTracking = ({ pageKey, merchantId }) =>
  tracker.trackImpression('Merchant PID', pageKey, merchantId);

export default withTerminalApiResponse(PaymentInitContainer);
