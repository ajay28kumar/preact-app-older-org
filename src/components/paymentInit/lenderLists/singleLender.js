// @flow
/** @jsx h */
import { h, Component } from 'preact';
import Redirect from '../../redirect';
import paymentLenderAction from '../../../actions/onPaymentLenderList/actionType';
import {
  paymentEmiSelectionRoute,
  payLaterPlanSelectionRoute,
} from '../../../alias/paymentRoutes';
import type { LenderDetails } from '../../../modelType/transactionTypes';

type Props = {
  /**
   * @param {LenderDetails} in case of single lender from user-transaction-info
   */
  lenderDetail: LenderDetails,
  /**
   * @property {Function} select function of lender
   * @callback
   * @return {LenderDetails}
   */
  lenderActionCallBack: Function,
};

export default class SingleLender extends Component<Props> {
  componentDidMount() {
    const { lenderActionCallBack, lenderDetail } = this.props || {};
    lenderActionCallBack(paymentLenderAction.onLenderSelection, lenderDetail);
  }
  render() {
    const { lenderDetail } = this.props || {};
    const emiSelection =
      lenderDetail.lenderType === 'PAY_LATER'
        ? payLaterPlanSelectionRoute
        : paymentEmiSelectionRoute;
    return (
      <Redirect
        to={`${emiSelection.path}${window.location.search}`}
        replace={true}
      />
    );
  }
}
