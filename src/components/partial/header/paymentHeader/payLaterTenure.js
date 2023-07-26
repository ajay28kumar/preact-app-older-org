// @flow
/** @jsx h */
import { h } from 'preact';
import style from './style.css';

type Props = {
  /**
   * @property {string} optional value
   */
  loanDuration?: string,
  /**
   * @property {'string'}
   */
  tenureType?: string,
};

const PayLaterTenureContainer = ({ loanDuration, tenureType }: Props) => {
  if (!loanDuration && !tenureType) {
    return null;
  }
  return (
    <div>
      {' '}
      <div className='font12 text80'>Payment Tenure: </div>
      <div className={style.emiAmount}>
        <span className='bold-text font14' id='installmentTenure'>
          {loanDuration}{' '}
        </span>
        <span className='font12' id='installmentTenureType'>
          {tenureType}
        </span>
      </div>
    </div>
  );
};

export default PayLaterTenureContainer;
