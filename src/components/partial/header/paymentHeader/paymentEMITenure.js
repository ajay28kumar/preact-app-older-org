// @flow
/** @jsx h */
import { h } from 'preact';
import style from './style.css';
import { currencyFormat } from '../../../directives/currencyFormat';

type Props = {
  /**
   * @property {string} optional value
   */
  loanDuration?: string,
  /**
   * @property {'string'}
   */
  monthlyInstallment?: string,
};

const PaymentEMITenureContainer = ({
  loanDuration,
  monthlyInstallment,
}: Props) => {
  if (!loanDuration && !monthlyInstallment) {
    return null;
  }
  return (
    <div className={style.emiWrapper}>
      <div className={style.emiText} id='installmentEMItenure'>
        {loanDuration} months EMI
      </div>
      <div className={style.emiAmount}>
        <span className='bold-text' id='monthlyInstallment'>
          &#x20b9;{currencyFormat(monthlyInstallment)}
        </span>
        /month
      </div>
    </div>
  );
};

export default PaymentEMITenureContainer;
