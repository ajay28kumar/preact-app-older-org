import style from './style.css';
import { currencyFormat } from '../../directives/currencyFormat';

const EmiTable = ({ emiPlan }) => {
  const { tenure, emi, totalAmountPayableToBank } = emiPlan || {};
  return (
    <div
      className={`${style.tableBody} ${style.tableDivider}`}
      id={`emi-row-${tenure}`}>
      <div className='font14 bold-text text80'>{tenure} months</div>
      <div className='font14 bold-text text80'>₹{currencyFormat(emi)}</div>
      <div className='font14 text80'>
        ₹{currencyFormat(totalAmountPayableToBank)}
      </div>
    </div>
  );
};

export default EmiTable;
