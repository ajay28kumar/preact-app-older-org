/** @jsx h */
import Header from './header';
import LenderDetail from './lenderDetail';
import style from './style.css';
import EmiTable from './emiTable';
import { currencyFormat } from '../../directives/currencyFormat';
import { Component, h } from 'preact';
import { isMobile } from '../../../utils/helper';
import withBaseComponent from '../../../HOC/withBaseComponent';

class WidgetEMITables extends Component {
  pageKey = 'pv_emi_plans';
  metadata = this.props.metadata;
  render() {
    const { amount, lenderDetails, removeSelectedLender } = this.props || {};
    const {
      logoIcon,
      name,
      emiPlans,
      minLoanAmount,
      maxLoanAmount,
      bankRemarkDetailed,
    } = lenderDetails || {};
    const minEMIAmountCase = minLoanAmount > amount;
    const maxEMIAmountCase = maxLoanAmount < amount;

    return (
      <div>
        <Header removeSelectedLender={removeSelectedLender} />
        <LenderDetail amount={amount} logoIcon={logoIcon} name={name} />
        {emiPlans && emiPlans.length > 0 ? (
          <div className={style.tableContainer}>
            <div className={style.tableBody}>
              <div className='font14 bold-text text60'>Tenure</div>
              <div className='font14 bold-text text60'>Monthly EMI</div>
              <div className='font14 bold-text text60'>Total</div>
            </div>
            {emiPlans.map((emiPlan) => {
              return <EmiTable emiPlan={emiPlan} />;
            })}
          </div>
        ) : (
          <div className={style.tableContainer}>
            {minEMIAmountCase || maxEMIAmountCase ? (
              <div className={style.emiErrorContainer}>
                {maxEMIAmountCase ? (
                  <div
                    className={`font16 text-center ${style.errorDescription}`}>
                    Maximum Cart Value should be less than{' '}
                    <b>₹{currencyFormat(maxLoanAmount)}</b>
                  </div>
                ) : (
                  <div
                    className={`font16 text-center ${style.errorDescription}`}>
                    Minimum Cart Value should be more than{' '}
                    <b>₹{currencyFormat(minLoanAmount)}</b>
                  </div>
                )}
              </div>
            ) : (
              <div className={style.emiErrorContainer}>
                <div className={`font16 text-center ${style.errorDescription}`}>
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

export default withBaseComponent(WidgetEMITables);
