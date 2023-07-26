// @flow
/** @jsx h */
import { h } from 'preact';
import LenderContainer from './lenderContainer';
import SingleLender from './singleLender';
import Redirect from '../../redirect';
import { paymentEnterMobileRoute } from '../../../alias/paymentRoutes';
import type { LenderDetails } from '../../../modelType/transactionTypes';

type Props = {
  /**
   * @property {boolean} isEligible to get user eligible for credit-line or not
   */
  isEligible: boolean,
  metadata: Object,
  /**
   * @param {Array<LenderDetails>} lenderDetailsList is list of lenders and their EMI and their EMI plans to
   * display lenderList and minimum display emi for given purchase amount
   */
  lenderDetailsList: Array<LenderDetails>,
  /**
   * @property {Function} onclick function of lender to store selected lenders in redux-state
   * @callback function will be passed as props to Lender
   * @return {LenderDetails}
   */
  lenderActionCallBack: Function,
};
const LenderLists = (props: Props) => {
  const { isEligible, metadata, lenderDetailsList, lenderActionCallBack } =
    props || {};
  if (!isEligible) {
    return <Redirect to={paymentEnterMobileRoute.path} />;
  }
  if (lenderDetailsList.length === 1) {
    return (
      <SingleLender
        lenderDetail={lenderDetailsList[0]}
        lenderActionCallBack={lenderActionCallBack}
      />
    );
  }
  return (
    <LenderContainer
      metadata={metadata}
      lenderDetailsList={lenderDetailsList}
      lenderActionCallBack={lenderActionCallBack}
    />
  );
};

export default LenderLists;
