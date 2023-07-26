// @flow
/** @jsx h */
import { h } from 'preact';
import { connect } from 'react-redux';
import { useState } from 'preact/hooks';
import EmiPanel from '../emiPanel';
import PayLaterPlanSelectionPanel from '../emiPanel/PayLaterPlanSelectionPanel';
import style from '../style.css';
import SubmitButton from '../../submitButton';
import { route } from 'preact-router';
import paymentEmiAction from '../../../actions/onPaymentEmi/actionType';
import { paymentConfirmRoute } from '../../../alias/paymentRoutes';
import type {
  EmiDetails,
  LenderDetails,
} from '../../../modelType/transactionTypes';
import { tracker, UserActionType } from '../../../tracking';
import CancelTransactionButton from '../../cancelTransactionButton';

type Props = {
  /**
   * @property {string}
   */
  pageKey: string,
  /**
   * @param {string} is emi dates for pay-later product
   */
  emiDates?: string,
  /**
   * @param {Array<EmiDetails>} is list of emiDetails to select emi
   */
  emiDetailsList: Array<EmiDetails>,
  /**
   * @param {Array<EmiDetails>} is list of emiDetails to select emi
   */
  selectedLender: LenderDetails,
  /**
   * @property {Function}
   * @callback function to store selected emi data in redux
   */
  doEmiAction: Function,
  selectedEmiDetails: Object,
};

const EmiList = (props: Props) => {
  const {
    pageKey,
    metadata,
    emiDates,
    emiDetailsList,
    selectedLender,
    doEmiAction,
    selectedEmiDetails,
  } = props || {};
  const { lenderType } = selectedLender || {};
  const [selectedEmi, setSelectedEmi] = useState(selectedEmiDetails || {});
  const [clickStatus, setClickStatus] = useState(false);
  const { path } = paymentConfirmRoute;
  const additionalTrackingData = {
    ...metadata,
    tenure: selectedEmi.loanDuration,
    emi_amount: selectedEmi.effectiveMonthlyInstallment,
  };
  const onClick = () => {
    setClickStatus(true);
    setTimeout(() => {
      doEmiAction(paymentEmiAction.onEmiSelection, selectedEmi);
      route(`${path}${window.location.search}`, true);
    }, 1000);
  };

  return (
    <div>
      {emiDetailsList.map((emiDetail, index) => {
        const { creditSchemeVariantId } = emiDetail || {};
        return (
          <div>
            {lenderType === 'EMI' && (
              <EmiPanel
                elementID={`emi-panel-${index}`}
                key={creditSchemeVariantId}
                emiDetail={emiDetail}
                checked={
                  selectedEmi.creditSchemeVariantId === creditSchemeVariantId
                }
                onSelectEmi={() => {
                  tracker.trackUserInteraction(
                    UserActionType.CLICK,
                    'tenure_plan_select',
                    pageKey,
                    {
                      ...additionalTrackingData,
                      tenure: emiDetail.loanDuration,
                      emi_amount: emiDetail.effectiveMonthlyInstallment,
                    },
                  );
                  setSelectedEmi({ ...emiDetail, lenderType });
                }}
              />
            )}
            {lenderType === 'PAY_LATER' && (
              <PayLaterPlanSelectionPanel
                elementID={`emi-panel-${index}`}
                key={creditSchemeVariantId}
                emiDetail={emiDetail}
                emiDates={emiDates}
                checked={
                  selectedEmi.creditSchemeVariantId === creditSchemeVariantId
                }
                onSelectEmi={() => {
                  tracker.trackUserInteraction(
                    UserActionType.CLICK,
                    'tenure_pay_later_plan_select',
                    pageKey,
                    {
                      ...additionalTrackingData,
                      tenure: emiDetail.loanDuration,
                      emi_amount: emiDetail.effectiveMonthlyInstallment,
                    },
                  );
                  setSelectedEmi({ ...emiDetail, lenderType });
                }}
              />
            )}
          </div>
        );
      })}
      {lenderType === 'EMI' && (
        <div className={style.emiRoundUp}>
          * EMI has been rounded up to the next rupee
        </div>
      )}
      {lenderType === 'PAY_LATER' && (
        <div>
          <ul className={style.payLaterSubHeaderList}>
            <li className='text-color font12 bold-text' id='amountPrincipal'>
              Purchase amount (principal) to be paid at the end of tenure.
            </li>
            <li id='loan-booking-date' className='font12 text60 bold-text'>
              The actual repayment dates may be different based on the loan
              booking date.
            </li>
          </ul>
        </div>
      )}
      <SubmitButton
        pageKey={pageKey}
        elementName='tenure_confirm'
        metadata={additionalTrackingData}
        buttonText='Confirm'
        buttonDisabled={!selectedEmi.creditSchemeVariantId}
        className={style.button}
        requestStatus={clickStatus}
        buttonOnClick={onClick}
      />
      <CancelTransactionButton />
    </div>
  );
};

const mapStateToProps = ({ paymentUserData }) => {
  const { selectedEmiDetails } = paymentUserData;

  return {
    selectedEmiDetails,
  };
};

export default connect(mapStateToProps)(EmiList);
