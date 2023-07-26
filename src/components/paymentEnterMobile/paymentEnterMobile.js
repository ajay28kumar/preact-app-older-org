// @flow
/** @jsx h */
import { h, Component, Fragment } from 'preact';
import { redirectToPaymentInit } from '../../actions/redirectAction';
import paymentEnterMobileAction from '../../actions/onPaymentEnterMobile/actionType';
import { apiStatus } from '../../actionTypes';
import { route } from 'preact-router';
import style from './style.css';
import MuiInput from '../material-ui/muiInput';
import SubmitButton from '../submitButton';
import ExitLayer from '../common/exitLayer';
import {
  payLaterPlanSelectionRoute,
  paymentEmiSelectionRoute,
  paymentLenderListRoute,
} from '../../alias/paymentRoutes';
import type { ApiState } from '../../modelType';
import Spinner from '../spinner/spinner';
import PurchaseAmount from '../paymentInit/purchaseAmount';
import LenderBrands from '../common/lenderBrands';
import BenefitList from '../common/benefitList';
import paymentLenderAction from '../../actions/onPaymentLenderList/actionType';
import HelpIcon from '../payment/helpIcon';
import type { LenderDetails } from '../../modelType/transactionTypes';
import CancelTransactionButton from '../cancelTransactionButton';
import { lenderTheme } from '../../utils/lenderTheme';

type Props = {
  matches: Object,
  merchantId: string,
  lenderName?: string,
  /**
   * txnUuid is transaction id (optional)
   * @property {string}
   */
  txnUuid?: string,
  /**
   * preSelectedLenderId is transaction lenderID if user already selected a lender through merchant screen (optional)
   * @property {number}
   */
  preSelectedLenderId?: number,
  /**
   * logoIcon is transaction lender-logo if user already selected a lender through merchant screen (optional)
   * @property {string}
   */
  logoIcon?: string,
  /**
   * lenderDetailsStatus is status of `lender details`
   * @param {ApiState}
   */
  lenderDetailsStatus: ApiState,
  /**
   * purchaseValue is the amount for which transaction started (required)
   * @property {string}
   */
  purchaseValue: string,
  /**
   * errorMessage is error message from userTransactionInfoApi (if user is not eligible)
   * @property {string}
   */
  errorMessage?: string,
  /**
   * @param {Array<LenderDetails>} lenderDetailsList is list of lenders and their EMI and their EMI plans to
   * display lenderList and minimum display emi for given purchase amount
   */
  lenderDetailsList: Array<LenderDetails>,
  /**
   * onPaymentEnterMobile is a dispatch function to update enter-mobile and to make userTransactionInfoApi call
   * @property {Function}
   */
  onPaymentEnterMobile: Function,
};

type State = {
  /**
   * mobileNo of user saving in components local-state
   * @property {string}
   */
  mobileNo: string,
};

export class PaymentEnterMobile extends Component<Props, State> {
  pageKey = 'pv_payment_enter_mobile_mob';
  metadata = {
    campaign_id: this.props.matches.utm_campaign,
    lender_name: this.props.lenderName,
    merchant_id: this.props.merchantId,
    txn_amount: this.props.purchaseValue,
  };
  state = {
    mobileNo: '',
  };

  componentDidMount() {
    const { txnUuid } = this.props || {};
    if (!txnUuid) {
      return redirectToPaymentInit();
    }
    this.onPaymentEnterMobile(paymentEnterMobileAction.initialize);
  }

  componentDidUpdate(previousProps) {
    const { lenderDetailsStatus: prevLenderDetailsStatus } =
      previousProps || {};
    const { lenderDetailsStatus, lenderDetailsList } = this.props || {};
    if (
      lenderDetailsStatus === apiStatus.SUCCESS &&
      lenderDetailsStatus !== prevLenderDetailsStatus
    ) {
      if (lenderDetailsList.length === 1) {
        const lenderDetail = lenderDetailsList[0];
        this.lenderActionCallBack(
          paymentLenderAction.onLenderSelection,
          lenderDetail,
        );
        const emiSelection =
          lenderDetail.lenderType === 'PAY_LATER'
            ? payLaterPlanSelectionRoute
            : paymentEmiSelectionRoute;
        return route(`${emiSelection.path}${window.location.search}`, true);
      }
      route(`${paymentLenderListRoute.path}${window.location.search}`, true);
    }
  }

  onPaymentEnterMobile = (actionType: string, ...rest: any) => {
    this.props.onPaymentEnterMobile(actionType, ...rest);
  };

  onSubmitMobile = () => {
    this.onPaymentEnterMobile(paymentEnterMobileAction.updateMobileNumber, {
      txnUuid: this.props.txnUuid,
      mobile: this.state.mobileNo,
    });
  };

  lenderActionCallBack = (actionType: string, ...actionPayload: any) => {
    this.props.onPaymentLenderList(actionType, ...actionPayload);
  };

  render() {
    const { mobileNo } = this.state || {};
    const {
      errorMessage,
      lenderDetailsStatus,
      txnUuid,
      preSelectedLenderId,
      logoIcon,
      purchaseValue,
    } = this.props || {};
    if (!txnUuid) {
      return (
        <div className='loaderContainer'>
          <Spinner />
        </div>
      );
    }
    return (
      <div className={style.enterMobileContainer}>
        <ExitLayer pageKey={this.pageKey} exitPath={''} />
        <div className={style.purchaseContainer}>
          <PurchaseAmount purchaseValue={purchaseValue} />
        </div>
        <div className={style.enterMobileBody}>
          {preSelectedLenderId && (
            <img
              src={lenderTheme[preSelectedLenderId].brandingLogo}
              alt='lender-logo'
              className={style.lenderLogo}
            />
          )}
          {preSelectedLenderId && preSelectedLenderId === '502' ? (
            <Fragment>
              <div className={style.headerContainer}>
                <div
                  className={`${
                    style.textSpace
                  } font20 bold-text text80 text-center`}>
                  Shop now, Pay later
                </div>
                <div
                  className={`${
                    style.textSpace
                  } font16 bold-text text60 text-center`}>
                  No Card needed
                </div>
              </div>
            </Fragment>
          ) : (
            <div className={style.headerContainer}>
              <div
                className={`${
                  style.textSpace
                } font20 bold-text text80 text-center`}>
                Complete EMI Transaction
              </div>
              <div
                className={`${
                  style.textSpace
                } font16 bold-text text60 text-center`}>
                No Card needed
              </div>
            </div>
          )}
          <div className={style.inputBox}>
            <div className={`${style.textSpace} font14 bold-text `}>
              <span className='text60'>
                Enter mobile registered with your Bank or Loan Provider
              </span>
              <HelpIcon
                transactionHelpTitle='Registered mobile number'
                helpText={() => (
                  <p className='font14 text60'>
                    Use the mobile number that has been registered with your
                    Bank or Loan Provider.
                    <br />
                    The number will be used to check if you have a pre-approved
                    limit from your Bank or Loan Provider.
                  </p>
                )}
              />
            </div>
            <MuiInput
              isError={lenderDetailsStatus === apiStatus.ERROR && errorMessage}
              autoFocus={true}
              inputName='payment-enter-mobile'
              inputPlaceholder='Mobile number'
              inputID='payment-enter-mobile'
              inputValue={mobileNo}
              inputType='tel'
              maxLength={10}
              minLength={10}
              pageKey={this.pageKey}
              elementName={'mob_enter_mobile'}
              metadata={this.metadata}
              className={style.inputWidth}
              onChange={(e) => {
                const text = e.target.value;
                const mobileNo = text ? text.replace(/[^0-9]/g, '') : '';
                this.setState({ mobileNo });
              }}
            />
            {errorMessage ? (
              <div className='inputError' id='payment-enter-mobile'>
                {errorMessage}
              </div>
            ) : (
              <div className='font12 text60'>
                You will get an OTP on this number
              </div>
            )}
            <SubmitButton
              pageKey={this.pageKey}
              elementName={'mob_verify_user_mobile_btn'}
              metadata={this.metadata}
              className={style.submitButton}
              buttonDisabled={this.state.mobileNo.length !== 10}
              buttonText='Submit'
              buttonOnClick={this.onSubmitMobile}
              requestStatus={lenderDetailsStatus === apiStatus.INITIATED}
            />
            <CancelTransactionButton />
          </div>
          {!preSelectedLenderId && (
            <LenderBrands
              preSelectedLenderId={preSelectedLenderId}
              logoIcon={logoIcon}
            />
          )}
          <BenefitList />
        </div>
      </div>
    );
  }
}
