/** @jsx h */
import { h } from 'preact';
import style from './style.css';

const LenderList = ({
  lenders,
  selectedLendersBankCode,
  amount,
  onSelectLender,
}) => {
  return (
    <div className={style.lenderWrapper} id='lender-amount-container'>
      <div className={style.lenderContainer}>
        <div>
          EMI for <b>₹{amount}</b>
        </div>
      </div>
      {lenders.map((lender) => {
        return (
          <div
            className={`${style.lenderContainer} ${
              selectedLendersBankCode === lender.bankCode
                ? style.activeLender
                : ''
            }`}
            onClick={() => onSelectLender(lender.bankCode, lender.name)}>
            <img
              src={lender.logoIcon}
              className={style.lenderIcon}
              alt={lender.name}
            />
            <div className='font16 text80 bold-text'>{lender.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default LenderList;
