// @flow
/** @jsx h */
import { h } from 'preact';
import Panel from '../../material-ui/panel';
import style from '../style.css';
import { route } from 'preact-router';
import { currencyFormat } from '../../directives/currencyFormat';
import paymentInitAction from '../../../actions/onPaymentInit/actionType';
import {
  paymentEmiSelectionRoute,
  payLaterPlanSelectionRoute,
} from '../../../alias/paymentRoutes';
import type { LenderDetails } from '../../../modelType/transactionTypes';
import { tracker, UserActionType } from '../../../tracking';

type Props = {
  /**
   * @property {string}
   */
  pageKey: string,
  metadata: Object,
  /**
   * @param {LenderDetails} details of lender and their emi to display lender-list with minimum emi details
   */
  lenderDetail: LenderDetails,
  /**
   * @property {Function} onclick function of lender to store selected lenders in redux-state
   * @callback
   * @return {LenderDetails}
   */
  lenderActionCallBack: Function,
};

const Lender = (props: Props) => {
  const { pageKey, metadata, lenderDetail, lenderActionCallBack } = props || {};
  const { logoIcon, lenderName, emiDetailsList, lenderId, lenderType } =
    lenderDetail || {};
  /**
   * we are getting any value of monthlyInstallment for comparison
   * @type {*|T|{monthlyInstallment}|T|{monthlyInstallment: number}|number}
   */

  const minimumEmi =
    emiDetailsList &&
    emiDetailsList.reduce(
      (a, b) => ({
        monthlyInstallment: Math.min(
          a.monthlyInstallment,
          b.monthlyInstallment,
        ),
      }),
      { monthlyInstallment: emiDetailsList[0].monthlyInstallment },
    );
  const minEmiDetailList =
    emiDetailsList && minimumEmi
      ? emiDetailsList.filter(
          (item) => item.monthlyInstallment === minimumEmi.monthlyInstallment,
        )[0]
      : {};
  const { loanDuration: durationForMinEmi } = minEmiDetailList || {};

  /**
   * we are getting any value of effectiveInterestRate  for comparison
   * @type {*|T|{effectiveInterestRate}|T|{effectiveInterestRate: number}|number}
   */
  const minimumInterestRate =
    emiDetailsList &&
    emiDetailsList.reduce(
      (a, b) => ({
        effectiveInterestRate: Math.min(
          a.effectiveInterestRate,
          b.effectiveInterestRate,
        ),
      }),
      { effectiveInterestRate: emiDetailsList[0].effectiveInterestRate },
    );

  const { monthlyInstallment } = minimumEmi || {};
  const { effectiveInterestRate } = minimumInterestRate || {};
  const isLenderDisable = !emiDetailsList;
  const id = process.env.NODE_ENV !== 'production' ? lenderId : '';
  const emiSelectionPath =
    lenderType && lenderType === 'PAY_LATER'
      ? payLaterPlanSelectionRoute.path
      : paymentEmiSelectionRoute.path;
  return (
    <Panel className={style.lenderPanel}>
      <div
        className={`${style.lenderDetails} ${
          isLenderDisable ? style.lenderPanelDisable : ''
        }`}
        id={id}
        onClick={() => {
          if (!isLenderDisable) {
            lenderActionCallBack(
              paymentInitAction.onLenderSelection,
              lenderDetail,
            );
            tracker.trackUserInteraction(
              UserActionType.CLICK,
              'len_lender_select',
              pageKey,
              {
                ...metadata,
                lender_name: lenderName,
                selected_lender: lenderName,
              },
            );

            return route(`${emiSelectionPath}${window.location.search}`, true);
          }
        }}
        style={{ cursor: emiDetailsList ? 'pointer' : 'not-allowed' }}>
        <div className={style.lenderImage} style={{ width: '25%' }}>
          <img src={logoIcon} className={style.lenderLogo} />
        </div>
        <div className={style.emiContainer} style={{ width: '65%' }}>
          <div>
            <div className={`${style.lenderName} bold-text`}>{lenderName}</div>
            {!isLenderDisable && (
              <div>
                {lenderType === 'PAY_LATER' ? (
                  <div>
                    <div>
                      {effectiveInterestRate === 0 && (
                        <div className={style.lenderEmi}>
                          <span className={style.tenure}>15 Days </span>
                          <span className='text-color bold-text'>
                            @ No Cost
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      {effectiveInterestRate > 0 && (
                        <div className={style.lenderEmi}>
                          <span className={style.tenure}>
                            {' '}
                            Buy Now, Pay Later
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>
                      {effectiveInterestRate > 0 && (
                        <div className={style.lenderEmi}>
                          <span className={style.tenure}>EMI starting </span>
                          <span className='text-color'>
                            {' '}
                            <span className='bold-text'>
                              @ &#8377;
                              {currencyFormat(monthlyInstallment)}&nbsp;
                            </span>
                            x
                            <span className='bold-text'>
                              &nbsp;{durationForMinEmi} months
                            </span>
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      {effectiveInterestRate === 0 && (
                        <div
                          className={`${style.lenderEmi} text-color bold-text`}>
                          No Cost
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {emiDetailsList && (
          <div className={style.arrowContainer} style={{ width: '10%' }}>
            <i className={`material-icons ${style.arrow} primary-color`}>
              keyboard_arrow_right
            </i>
          </div>
        )}
      </div>
    </Panel>
  );
};

export default Lender;
