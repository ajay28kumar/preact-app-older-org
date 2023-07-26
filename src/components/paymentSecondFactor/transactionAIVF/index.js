// @flow
/** @jsx h */
import { h, Component, Fragment } from 'preact';
import { connect } from 'react-redux';
import VerifyDebitCardAIVF from './verifyDebitCardAIVF';
import VerifyDigitsOfPANcard from './verifyDigitsOfPANcard';
import VerifyPANCard from './verifyPANCard';
import SubmitButton from '../../submitButton';
import { apiStatus } from '../../../actionTypes';
import paymentConfirmActionType from '../../../actions/onPaymentConfirm/actionType';
import { aivfProps } from '../helper';
import ExperimentCardlessEmiInfo from './experimentCardlessEmiInfo';
import style from '../style.css';

import type { AivfType, ApiState } from '../../../modelType';

type State = {
  aivfValue: string,
};

type Props = {
  /**
   * @property {string} pageKey of parent (useful for tracking)
   */
  pageKey: string,
  lenderType: string,
  /**
   * @property {string} error message from redux for AIVF error case (optional)
   */
  errorMessage?: string,
  /**
   * @param {ApiState} status of verify AIVF API
   */
  confirmAivfApiState: ApiState,
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
   * @param {string} text on submitButton
   */
  submitText: string,
  metadata: Object,
  /**
   * @property {Function}
   * @callback to submit AIVF value to parent Component and invoking confirmAivfAPI
   */
  verifyAivf: Function,
  /**
   * @property {Function}
   * @callback to invoke initiateTransactionAPI
   */
  paymentConfirmCallBack: Function,
};

class TransactionAIVF extends Component<Props, State> {
  state = {
    aivfValue: '',
  };
  componentDidUpdate(previousProps) {
    const { confirmAivfApiState } = this.props || {};
    const { confirmAivfApiState: prevConfirmAivfApiState } =
      previousProps || {};
    if (
      confirmAivfApiState === apiStatus.SUCCESS &&
      prevConfirmAivfApiState !== confirmAivfApiState
    ) {
      this.initiateTransaction();
    }
  }

  initiateTransaction = () => {
    this.props.paymentConfirmCallBack(
      paymentConfirmActionType.initiateTransaction,
      {
        aivfValue: this.state.aivfValue,
      },
    );
  };
  updateAivf = (aivfValue) => {
    this.setState({ aivfValue });
  };

  renderInputBox = () => {
    const { aivfType, pageKey, errorMessage, metadata, confirmAivfApiState } =
      this.props || {};
    const { aivfValue } = this.state || {};
    const additionalTrackingData = {
      ...metadata,
      AIVF_Type: aivfType,
    };
    switch (aivfType) {
      case 'PAN_CARD':
        return (
          <VerifyPANCard
            confirmAivfApiState={confirmAivfApiState}
            pageKey={pageKey}
            metadata={additionalTrackingData}
            aivfValue={aivfValue}
            errorMessage={errorMessage}
            updateAivf={this.updateAivf}
          />
        );
      case 'PAN_CARD_NUMBERS':
        return (
          <VerifyDigitsOfPANcard
            confirmAivfApiState={confirmAivfApiState}
            pageKey={pageKey}
            metadata={additionalTrackingData}
            aivfValue={aivfValue}
            errorMessage={errorMessage}
            updateAivf={this.updateAivf}
          />
        );
      case 'LAST_DIGITS_OF_DEBIT_CARD':
        return (
          <VerifyDebitCardAIVF
            confirmAivfApiState={confirmAivfApiState}
            pageKey={pageKey}
            metadata={additionalTrackingData}
            aivfValue={aivfValue}
            errorMessage={errorMessage}
            updateAivf={this.updateAivf}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const {
      merchantId,
      pageKey,
      aivfType,
      lenderType,
      submitText,
      confirmAivfApiState,
      metadata,
      verifyAivf,
    } = this.props || {};
    if (aivfType === 'NONE') {
      return null;
    }
    const additionalTrackingData = {
      ...metadata,
      AIVF_Type: aivfType,
    };
    const { aivfValue } = this.state || {};
    const requestStatus =
      confirmAivfApiState === apiStatus.INITIATED ||
      confirmAivfApiState === apiStatus.SUCCESS;
    const { isValidAivf, aivfLength } = aivfProps({
      aivfType,
      lenderName: '',
      cardName: '',
      aivfValue,
    });

    return (
      <Fragment>
        {this.renderInputBox()}
        <SubmitButton
          pageKey={pageKey}
          metadata={additionalTrackingData}
          elementName='aivf_confirm'
          className={style.submitButton}
          buttonDisabled={!(aivfValue.length === aivfLength && isValidAivf)}
          buttonText={submitText}
          buttonOnClick={() => verifyAivf(aivfValue)}
          requestStatus={requestStatus}
        />
        {lenderType !== 'PAY_LATER' && merchantId !== '10100' && (
          <ExperimentCardlessEmiInfo />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ paymentUserData, paymentDetails }) => {
  const { merchantId } = paymentDetails;
  const {
    aivfType,
    confirmAivfApiState,
    initiateTransactionApiState,
    errorMessage,
    selectedLender,
  } = paymentUserData || {};
  const { lenderType } = selectedLender || {};

  return {
    merchantId,
    aivfType,
    lenderType,
    confirmAivfApiState,
    initiateTransactionApiState,
    errorMessage,
  };
};

export default connect(mapStateToProps)(TransactionAIVF);
