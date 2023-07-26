// @flow
/** @jsx h */
import { h } from 'preact';
import style from '../style.css';
import { currencyFormat } from '../../directives/currencyFormat';

type Props = {
  /**
   * @property {string} optional value
   */
  purchaseValue?: string,
  /**
   * @property {'right' | 'left'} to positioned purchase value
   */
  textPosition: 'right' | 'left',
};

const PurchaseAmount = ({ purchaseValue, textPosition }: Props) => {
  if (!purchaseValue) {
    return null;
  }
  return (
    <div className={style.purchaseAmountContainer}>
      <div className={`${style.purchaseHeader}`}>AMOUNT:</div>
      <div
        className={`${style.purchaseAmount} bold-text`}
        style={{ textAlign: textPosition }}
        id='purchase-amount'>
        &#8377;{currencyFormat(purchaseValue)}
      </div>
    </div>
  );
};
PurchaseAmount.defaultProps = {
  textPosition: 'right',
};
export default PurchaseAmount;
