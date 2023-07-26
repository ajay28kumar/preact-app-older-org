import { h } from 'preact';
import style from './style.css';
import { currencyFormat } from '../directives/currencyFormat';

const PayLaterSuccessMessage = ({ selectedEmiDetails, purchaseValue }) => {
  const {
    loanDuration,
    tenureType,
    effectiveInterestRate,
    totalDiscountAmount,
    loanAmount,
    effectiveMonthlyInstallment,
  } = selectedEmiDetails || {};
  return (
    <div>
      <div className={style.purchaseDetails}>
        <div>
          <div className='text60 font12 bold-text'>Amount</div>
          <div className='font16 bold-text' id='amount'>
            &#8377;{currencyFormat(purchaseValue)}
          </div>
        </div>
        <div className='text-center'>
          <div className='font12 bold-text text60'>Tenure </div>
          <div className='font14  bold-text'>
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
          <div className='font12 text60 bold-text'>Interest</div>
          {effectiveInterestRate > 0 ? (
            <div>
              <span className='bold-text font16' id='installment'>
                &#8377;{currencyFormat(effectiveMonthlyInstallment)}
              </span>
              <span className='font12'>/month</span>
            </div>
          ) : (
            <div className='bold-text font14' id='installment'>
              No Extra Cost
            </div>
          )}
        </div>
      </div>
      {effectiveInterestRate === 0 && (
        <div className={style.payLaterDiscountSection}>
          <div>
            <span>Discount: </span>
            <span className='bold-text' id='discount-amount'>
              {' '}
              &#8377;{currencyFormat(totalDiscountAmount)}{' '}
            </span>
            <span className={style.transactionAmountContainer}>
              Actual Loan Amount:
            </span>
            <span className='bold-text' id='actual-loan-amount'>
              {' '}
              &#8377;{loanAmount}{' '}
            </span>
          </div>
          <div className={style.interestRateText}>
            *Interest will be calculated on loan amount
          </div>
        </div>
      )}
    </div>
  );
};

export default PayLaterSuccessMessage;
