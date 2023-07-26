// @flow
/** @jsx h */
import { h } from 'preact';
import Redirect from '../redirect';
import { connect } from 'react-redux';
import {
  paymentConfirmRoute,
  paymentEnterMobileRoute,
  paymentLenderListRoute,
} from '../../alias/paymentRoutes';
import SingleLender from './lenderLists/singleLender';
import type { LenderDetails } from '../../modelType/transactionTypes';

type Props = {
  /**
   * transactionInfoPreSelectedApiState tells that emi and lender has already been selected from pg
   * @property {boolean}
   */
  transactionInfoPreSelectedApiState: boolean,
  /**
   * @param {Array<LenderDetails>} lenderDetailsList is list of lenders and their EMI and their EMI plans to
   * display lenderList and minimum display emi for given purchase amount
   */
  lenderDetailsList: Array<LenderDetails>,
  /**
   * isEligible tells us about eligible for credit line or not
   * @property {boolean}
   */
  isEligible: boolean,
  lenderActionCallBack: Function,
};

const InitiatePayment = (props: Props) => {
  const {
    transactionInfoPreSelectedApiState,
    lenderDetailsList,
    lenderActionCallBack,
    isEligible,
  } = props;

  if (transactionInfoPreSelectedApiState) {
    return (
      <Redirect
        to={`${paymentConfirmRoute.path}${window.location.search}`}
        replace={true}
      />
    );
  }
  if (isEligible && lenderDetailsList.length === 1) {
    return (
      <SingleLender
        lenderDetail={lenderDetailsList[0]}
        lenderActionCallBack={lenderActionCallBack}
      />
    );
  }
  const path = isEligible
    ? paymentLenderListRoute.path
    : paymentEnterMobileRoute.path;

  return <Redirect to={`${path}${window.location.search}`} replace={true} />;
};

const mapStateToProps = ({ paymentDetails }) => {
  const { eligible: isEligible, lenderDetailsList } = paymentDetails || {};
  return {
    isEligible,
    lenderDetailsList,
  };
};

export default connect(mapStateToProps)(InitiatePayment);
