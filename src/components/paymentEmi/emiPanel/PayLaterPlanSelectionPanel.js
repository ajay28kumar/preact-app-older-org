// @flow
/** @jsx h */
import { h } from 'preact';
import Radio from 'preact-material-components/Radio';
import Panel from '../../material-ui/panel';
import 'preact-material-components/Radio/style.css';
import style from '../style.css';

import type { EmiDetails } from '../../../modelType/transactionTypes';
import Collapse from './collapse';

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
   * @param {Array<number>} EMI scheduled dates for PayLater plan
   */
  emiDates: Array<number>,
  /**
   * @param {EmiDetails} emiDetails to rendered emi
   */
  emiDetail: EmiDetails,
  /**
   * @property {Function} onClick function of EMI panel
   */
  onSelectEmi: Function,
};
const PayLaterPlanSelectionPanel = ({
  emiDetail,
  checked,
  onSelectEmi,
  elementID,
  emiDates,
}: Props) => {
  const {
    creditSchemeVariantId,
    loanDuration,
    tenureType,
    emiSchedule,
    effectiveMonthlyInstallment,
  } = emiDetail || {};
  let totalAmount = 0;
  for (const emiDate in emiSchedule) {
    if (emiSchedule.hasOwnProperty(emiDate)) {
      totalAmount += emiSchedule[emiDate];
    }
  }

  const emiList = [];
  emiDates.forEach((dates) => {
    if (Object.keys(emiSchedule).includes(dates.toString())) {
      emiList.push({
        [dates.toString()]: emiSchedule[dates.toString()],
      });
    }
  });

  return (
    <Panel
      className={`${style.emiPanel} cursorPointer payLaterContainer ${
        checked ? style.activePanel : ''
      } ${style.payLater}`}>
      {effectiveMonthlyInstallment === 0 && (
        <div className={style.noCostEmiBadgeContainer}>
          <div className={style.noCostEmiBadge}>
            <span className='font12 bold-text' id='noExtraCostTag'>
              NO EXTRA COST
            </span>
          </div>
        </div>
      )}
      <div className={style.emiDetails} onClick={onSelectEmi} id={elementID}>
        <div className={`${style.emiGrid} ${style.emiPanelPartialColor}`}>
          <div className={style.gridMonth}>
            <div className={style.centerItems}>
              <Radio id={creditSchemeVariantId} checked={checked} />
            </div>
          </div>
          <div className={style.gridMonth}>
            <div>
              <div className={style.duration}>
                <div className={`${style.totalAmountContainer} text-color`}>
                  {loanDuration}
                </div>
                <div className={style.interestRate}>{tenureType}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${style.emiGrid} ${style.payLaterGrid}`}>
          <div>
            <div className={`font12 text60 ${style.emiAmount}`}>
              Interest/month
            </div>
            <div className={`font18 text80 bold-text ${style.emiAmount}`}>
              &#8377; {effectiveMonthlyInstallment}
            </div>
          </div>
        </div>
        <div className={`${style.emiGrid} ${style.payLaterGrid}`}>
          <div>
            <div className={`font12 text60 ${style.emiAmount}`}>Total</div>
            <div className={`font20 text80 bold-text ${style.emiAmount}`}>
              &#8377; {totalAmount}
            </div>
          </div>
        </div>
      </div>
      <Collapse collapsed={!checked}>
        <div className={style.expandableColumn}>
          <div className={style.emiDetailsWrapper}>
            <div className={style.paymentScheduleContainer}>
              <div className={style.paymentScheduleWrapper}>
                <div className='font12 text60'>Payment</div>
                <div className='font12 text60'>Schedule</div>
              </div>
            </div>
            <div className={style.emiDetailsContainer}>
              {emiList.map((value: Object, index) => {
                const dateValue = Object.keys(value)[0];
                return (
                  <div className={style.emiDatesWrapper}>
                    <div className={style.emiDates}>
                      <div className={`font12 text60 ${style.emiAmount}`}>
                        {getDateMonthShort(parseInt(dateValue))}
                      </div>
                      <div
                        className={`font14 text60 bold-text ${
                          style.emiAmount
                        }`}>
                        &#8377;{value[dateValue]}
                      </div>
                    </div>
                    {index + 1 !== emiList.length && (
                      <div className={style.emiDivider} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Collapse>
    </Panel>
  );
};

export default PayLaterPlanSelectionPanel;

const getDateMonthShort = (timestamp: number) => {
  if (timestamp) {
    const dateObj = new Date(timestamp);
    const monthNameObject = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return (
      dateObj.getDate() + ' ' + monthNameObject[dateObj.getMonth()].substr(0, 3)
    );
  } else {
    return console.error('Empty Timestamp');
  }
};
