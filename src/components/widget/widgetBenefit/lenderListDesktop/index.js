/** @jsx h */
import { Component, h } from 'preact';
import LenderList from './lenderList';
import EmiTable from '../../widgetEMITable/emiTable';
import style from './style.css';
import { isMobile } from '../../../../utils/helper';
import PoweredBy from '../../poweredBy';
import { currencyFormat } from '../../../directives/currencyFormat';
import withBaseComponent from '../../../../HOC/withBaseComponent';

class LenderListDesktop extends Component {
  pageKey = 'pv_emi_options';
  metadata = {
    ...this.props.metadata,
  };
  render() {
    const { lenders, selectedLendersBankCode, amount, onSelectLender } =
      this.props || {};
    const selectedLender = lenders.filter(
      (lender) => lender.bankCode === selectedLendersBankCode,
    );
    const lenderDetails = selectedLender.length ? selectedLender[0] : [];
    const { emiPlans, minLoanAmount, maxLoanAmount, bankRemarkDetailed } =
      lenderDetails || {};
    const minEMIAmountCase = minLoanAmount > amount;
    const maxEMIAmountCase = maxLoanAmount < amount;
    return (
      <div className={style.lenderListContainer}>
        <LenderList
          lenders={lenders}
          amount={amount}
          onSelectLender={onSelectLender}
          selectedLendersBankCode={selectedLendersBankCode}
        />
        {emiPlans && emiPlans.length > 0 ? (
          <div className={style.emiTableContainer} id='emiTableContainer'>
            <div className={style.tableBody}>
              <div className='font14 bold-text text80'>Tenure</div>
              <div className='font14 bold-text text80'>Monthly EMI</div>
              <div className='font14 text80 bold-text'>Total</div>
            </div>
            {emiPlans.map((emiPlan) => {
              return <EmiTable emiPlan={emiPlan} />;
            })}
          </div>
        ) : (
          <div className={style.emiTableContainer}>
            {minEMIAmountCase || maxEMIAmountCase ? (
              <div className={style.emiErrorContainer}>
                {maxEMIAmountCase ? (
                  <div
                    className={`font16 text-center ${style.errorDescription}`}
                    id='loan-amount-limit-statement'>
                    Maximum Cart Value should be less than{' '}
                    <b>₹{currencyFormat(maxLoanAmount)}</b>
                  </div>
                ) : (
                  <div
                    className={`font16 text-center ${style.errorDescription}`}
                    id='loan-amount-limit-statement'>
                    Minimum Cart Value should be more than{' '}
                    <b>₹{currencyFormat(minLoanAmount)}</b>
                  </div>
                )}
              </div>
            ) : (
              <div className={style.emiErrorContainer}>
                <div
                  className={`font16 text-center ${style.errorDescription}`}
                  id='loan-amount-limit-statement'>
                  {bankRemarkDetailed}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withBaseComponent(LenderListDesktop);
