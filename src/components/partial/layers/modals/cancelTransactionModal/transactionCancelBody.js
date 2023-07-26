/** @jsx h */
import { h } from 'preact';
import { useEffect } from 'preact/compat';
import Dialog from 'preact-material-components/Dialog';
import { connect } from 'react-redux';
import style from './style.css';
import SubmitButton from '../../../../submitButton';
import ConfirmCancelButton from '../../../../cancelTransactionButton/confirmCancelButton';
import { apiStatus } from '../../../../../actionTypes';
import GenericLoader from '../../../../loader/GenericLoader';
import Utils from '../../../../../utils';
import BlockResult from '../../../../blockResult';
import { tracker, UserActionType } from '../../../../../tracking';

const TransactionCancelBody = (props) => {
  const {
    pgData,
    returnUrl,
    apiState,
    pageKey,
    errorMessage,
    closeModal,
    metadata,
  } = props || {};

  useEffect(() => {
    tracker.trackUserInteraction(
      UserActionType.MODAL,
      'cancel_pop_up',
      pageKey,
      metadata,
    );
  }, []);

  const submitReturnUrl = () => {
    const utils = new Utils();

    utils.createAndSubmitDynamicForm(pgData, returnUrl, 0);
  };

  if (apiState === apiStatus.INITIATED) {
    return (
      <div className={style.loaderWrapper}>
        <GenericLoader loadingMsg='We are processing your transaction cancellation.' />
      </div>
    );
  } else if (apiState === apiStatus.SUCCESS) {
    return (
      <div className={style.successMessage}>
        <div className={style.successIcon}>
          <i className={`${style.successIconImage} material-icons`}>done</i>
        </div>
        <div className='font14 text-center text80'>
          Transaction cancelled. We're redirecting you back to the merchant
          website.
        </div>
        <BlockResult
          visibilityTimeUntilRedirect={3}
          displayMessage='Returning to Merchant website in '
          buttonText='Go to Merchant Now'
          submitFormCallback={submitReturnUrl}
        />
      </div>
    );
  } else if (apiState === apiStatus.ERROR) {
    return (
      <div className={style.loaderWrapper}>
        <div className={style.successIcon}>
          <i className={`${style.successIconImage} material-icons`}>error</i>
        </div>
        <div className='font14 text-center text80'>
          {errorMessage || 'Something Went wrong. Please try it in some time'}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Dialog.Header>
        <div className='text-center bold-text font20 text80'>
          Cancel transaction?
        </div>
      </Dialog.Header>
      <Dialog.Body>
        <div className={`${style.bodyWrapper} font14 text80`}>
          If you cancel the transaction, you will be taken back to the merchant
          website.
        </div>
      </Dialog.Body>
      <Dialog.Footer>
        <div className={style.buttonContainer}>
          <SubmitButton
            pageKey={pageKey}
            elementName='continue_transaction'
            buttonText='Continue with transaction'
            className={`${style.confirmCancellation} font14`}
            buttonOnClick={closeModal}
            trackClickEvent={false}
          />
          <ConfirmCancelButton pageKey={pageKey} metadata={metadata} />
        </div>
      </Dialog.Footer>
    </div>
  );
};

const mapStateToProps = ({ config, modal, paymentUserData }) => {
  const { pageKey, metadata } = config || {};
  const { cancelTransaction } = modal || {};
  const { apiState, errorMessage } = cancelTransaction || {};
  const { pgData, returnUrl } = paymentUserData || {};
  return {
    pageKey,
    apiState,
    errorMessage,
    pgData,
    returnUrl,
    metadata,
  };
};
export default connect(mapStateToProps)(TransactionCancelBody);
