// @flow
/** @jsx h */
import { h } from 'preact';
import { connect } from 'react-redux';
import style from './style.css';
import BlockResult from '../blockResult';
import Utils from '../../utils';
import { tracker } from '../../tracking';

type Props = {
  /**
   * @property {string} pageKey of parent component
   */
  pageKey: string,
  /**
   * @property {string} url to get back to merchant
   */
  returnUrl: string,
  /**
   * @property {string} errorMessage description (why transaction failed?)
   */
  errorMessage?: string,
  /**
   * @property {Object} payment-gateway data to submit and redirect
   */
  pgData: Object,
};

const PaymentError = (props: Props) => {
  const { errorMessage } = props;
  if (!errorMessage) {
    tracker.trackApplicationError('Missing Error Message', props.pageKey);
  }
  const errorMsg =
    errorMessage ||
    'Sorry we are unable to process your purchase, please write to us at contact@flexmoney.in!';

  const submitReturnUrl = () => {
    const { pgData, returnUrl } = props;
    if (returnUrl) {
      const utils = new Utils();
      utils.createAndSubmitDynamicForm(pgData, returnUrl, 0);
    }
  };
  return (
    <div className={style.paymentBenefits}>
      <div className={`${style.errorIcon} errorColor material-icons`}>
        warning
      </div>
      <div className='font20 errorColor bold-text' id='payment-failure'>
        Unable To Process
      </div>
      <div className={style.errorMessageContainer}>
        <div className={`${style.errorMessage} font14`} id='error-message'>
          <span className='text60 bold-text'>{errorMsg}</span>
        </div>
      </div>
      <BlockResult
        visibilityTimeUntilRedirect={5}
        displayMessage='Returning to Merchant website in '
        buttonText='Go to Merchant Now'
        submitFormCallback={submitReturnUrl}
      />
    </div>
  );
};

const mapStateToProps = ({ paymentUserData, config }) => {
  const { pageKey } = config;
  const { pgData, returnUrl, errorMessage } = paymentUserData || {};
  return {
    pageKey,
    pgData,
    returnUrl,
    errorMessage,
  };
};

export default connect(mapStateToProps)(PaymentError);
