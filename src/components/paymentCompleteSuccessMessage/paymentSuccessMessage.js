import { h } from 'preact';
import { currencyFormat } from '../directives/currencyFormat';
import style from './style.css';

const PaymentSuccessMessage = ({ selectedEmiDetails, purchaseValue }) => {
  const { loanDuration, tenureType, effectiveMonthlyInstallment } =
    selectedEmiDetails || {};
  return (
    <div className={style.purchaseDetails}>
      <div>
        <div className='text60 font12 bold-text'>Amount</div>
        <div className='font16 bold-text' id='amount'>
          &#8377;{currencyFormat(purchaseValue)}
        </div>
      </div>
      <div className='text-center'>
        <div className='font12 bold-text text60'>Tenure </div>
        <div className='font14 bold-text'>
          <span>
            <span className='font16 bold-text' id='loan-duration'>
              {loanDuration}{' '}
            </span>
            <span class='textLowerCase' id='tenure-type'>
              {tenureType}
            </span>
          </span>
        </div>
      </div>
      <div>
        <div className='font12 text60 bold-text'>EMI</div>
        <div>
          <span className='bold-text font16' id='installment'>
            &#8377;{currencyFormat(effectiveMonthlyInstallment)}
          </span>
          <span className='font12'>/month</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessMessage;
