// @flow
/** @jsx h */
import { h } from 'preact';
import Radio from 'preact-material-components/Radio';
import Panel from '../../material-ui/panel';
import { currencyFormat } from '../../directives/currencyFormat';
import 'preact-material-components/Radio/style.css';
import style from '../style.css';

import type { EmiDetails } from '../../../modelType/transactionTypes';

type Props = {
  /**
   *@property {boolean} is EMI Panel Selected or not
   */
  checked: boolean,
  /**
   * @property {string} element-id of panel
   */
  elementID: string,
  /**
   * @param {EmiDetails} emiDetails to rendered emi
   */
  emiDetail: EmiDetails,
  /**
   * @property {Function} onClick function of EMI panel
   */
  onSelectEmi: Function,
};

const EmiPanel = ({ emiDetail, checked, onSelectEmi, elementID }: Props) => {
  const {
    creditSchemeVariantId,
    loanDuration,
    effectiveMonthlyInstallment,
    effectiveInterestRate,
  } = emiDetail || {};
  return (
    <Panel
      className={`${style.emiPanel} cursorPointer ${
        checked ? style.activePanel : ''
      }`}>
      <div className={style.emiDetails} onClick={onSelectEmi} id={elementID}>
        <div className={`${style.emiGrid} ${style.emiPanelPartialColor}`}>
          <div className={style.gridMonth}>
            <div className={style.centerItems}>
              <Radio id={creditSchemeVariantId} checked={checked} />
            </div>
          </div>
          <div className={style.gridMonth}>
            <div className={style.centerItems}>
              <div className={style.duration}>
                <div className={`${style.totalAmountContainer} text-color`}>
                  {loanDuration}
                </div>
                <div className={style.interestRate}>months</div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.emiGrid}>
          <div className={style.centerItems}>
            <div className={style.totalAmountContainer}>
              <div className={style.monthlyInstallment}>
                &#8377;{currencyFormat(effectiveMonthlyInstallment)}
              </div>
              <div className={style.interestRate}>/month</div>
            </div>
          </div>
        </div>
        <div className={style.emiGrid}>
          <div className={style.centerItems}>
            <div className={style.totalAmountContainer}>
              <div className={style.monthlyInstallment}>
                &#8377;
                {currencyFormat(effectiveMonthlyInstallment * loanDuration)}
              </div>
              {effectiveInterestRate > 0 ? (
                <div className={style.interestRate}>
                  Total @{effectiveInterestRate}% p.a.
                </div>
              ) : (
                <div className={style.interestRate}>NO COST</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default EmiPanel;
