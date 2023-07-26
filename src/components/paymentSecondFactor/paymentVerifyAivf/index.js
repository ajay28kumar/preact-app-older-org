// @flow
/** @jsx h */
import { h, Component } from 'preact';
import paymentConfirmActionType from '../../../actions/onPaymentConfirm/actionType';
import { apiStatus } from '../../../actionTypes';
import { aivfProps } from '../helper';
import { connect } from 'react-redux';
import { tracker, UserActionType } from '../../../tracking';
import TransactionAIVF from '../transactionAIVF';
import style from '../style.css';
import type { AivfType, ApiState } from '../../../modelType';

type Props = {
  /**
   * @property {string} pageKey of parent (useful for tracking)
   */
  pageKey: string,
  /**
   * @property {string} value coming from initiate-aivf API
   * @example
   * in case of verified AIVF providing last 4 digit of aivf (in case of HDFC)
   */
  aivfValue: string,
  /**
   * @param {ApiState} status of initiate transaction
   * init-transaction API is getting called after confirmAivf
   */
  initiateTransactionApiState: ApiState,
  /**
   * @param {AivfType} type of second factor verification
   */
  aivfType: AivfType,
  /**
   * @property {Function}
   * @callback to submit AIVF value to parent Component and invoking confirmAivfAPI
   */
  metadata: Object,
  paymentConfirmCallBack: Function,
};

class PaymentVerifyAIVF extends Component<Props> {
  componentDidMount() {
    if (this.props.aivfType === 'NONE') {
      this.verifyAivf();
    }
  }

  verifyAivf = (aivfValue) => {
    this.props.paymentConfirmCallBack(
      paymentConfirmActionType.verifySecondFactor,
      { aivfValue },
    );
  };
  onClickMissingAivf = () => {
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'No Debit Card Btn',
      this.props.pageKey,
    );

    this.dialogRef.MDComponent.show();
  };

  render() {
    const {
      pageKey,
      aivfValue,
      aivfType,
      aivfDetails,
      initiateTransactionApiState,
      metadata,
      paymentConfirmCallBack,
    } = this.props || {};
    const { cardIssuer, cardName } = aivfDetails || {};
    const { header, subHeaderSuccess, SubHeader, submitText } = aivfProps({
      aivfType,
      lenderName: cardIssuer,
      cardName,
    });

    if (aivfType === 'NONE') {
      return (
        <TransactionAIVF
          pageKey={pageKey}
          submitText={submitText}
          verifyAivf={this.verifyAivf}
          paymentConfirmCallBack={paymentConfirmCallBack}
        />
      );
    }

    const hasTransactionInitiatedSuccessfully =
      initiateTransactionApiState === apiStatus.SUCCESS;
    return (
      <div
        className={`${style.aivfContainer} ${
          !hasTransactionInitiatedSuccessfully
            ? style.activePaymentCard
            : style.inactivePaymentCard
        }`}>
        <div className={style.sectionContainer}>
          <div className={style.headerContainer}>
            <div className={style.stepContainer}>
              {!hasTransactionInitiatedSuccessfully ? (
                <div
                  className={`${style.stepNumber} ${style.enable} text-color`}>
                  1
                </div>
              ) : (
                <div
                  className={`${style.stepNumber} ${style.enable} text-color`}>
                  <i className={`material-icons ${style.iconFont}`}>check</i>
                </div>
              )}
            </div>
            <div>
              {!hasTransactionInitiatedSuccessfully ? (
                <div className={`${style.headerText} bold-text font16 text60`}>
                  {header}
                </div>
              ) : (
                <div className={`${style.headerText} bold-text font16 text60`}>
                  Account Verified
                </div>
              )}
              {!hasTransactionInitiatedSuccessfully ? (
                <SubHeader />
              ) : (
                subHeaderSuccess && (
                  <div className={`${style.subHeaderText} text80`}>
                    {/*Considering minimum length of AIVF Value will be 4*/}
                    {subHeaderSuccess} {aivfValue.substr(aivfValue.length - 4)}
                  </div>
                )
              )}
            </div>
          </div>
          <div className={style.inputContainer}>
            {!hasTransactionInitiatedSuccessfully && (
              <TransactionAIVF
                pageKey={pageKey}
                metadata={metadata}
                submitText={submitText}
                verifyAivf={this.verifyAivf}
                paymentConfirmCallBack={paymentConfirmCallBack}
              />
            )}
            <div />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ paymentUserData }) => {
  const { aivfType, aivfDetails, aivfValue, initiateTransactionApiState } =
    paymentUserData || {};
  return {
    aivfType,
    aivfDetails,
    aivfValue,
    initiateTransactionApiState,
  };
};

export default connect(mapStateToProps)(PaymentVerifyAIVF);
