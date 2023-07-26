/** @jsx h */
import { h } from 'preact';
import { connect } from 'react-redux';
import onTransactionHelp from '../../actions/onTransactionHelp';
import { tracker, UserActionType } from '../../tracking';
import style from './payment.css';

const HelpIcon = (props) => {
  const { pageKey, onTransactionHelp, transactionHelpTitle, helpText } =
    props || {};
  const onClickAction = () => {
    tracker.trackUserInteraction(UserActionType.CLICK, 'help_text', pageKey, {
      lender_id: props.lenderId,
      merchant_id: props.merchantId,
      txn_amount: props.purchaseValue,
      tenure: props.loanDuration || '',
    });
    onTransactionHelp({ transactionHelpTitle, helpText });
  };
  return (
    <img
      src='https://iccdn.in/img/transaction-help-outline-v2.svg'
      alt='help'
      onClick={onClickAction}
      className={style.helpIcon}
    />
  );
};

const mapStateToProps = ({ paymentDetails, paymentUserData, config }) => {
  const { pageKey } = config || {};
  const { purchaseValue, merchantId } = paymentDetails || {};
  const { selectedLender, selectedEmiDetails } = paymentUserData;
  const { loanDuration } = selectedEmiDetails || {};
  const { lenderId } = selectedLender || {};
  return {
    pageKey,
    purchaseValue,
    merchantId,
    loanDuration,
    lenderId,
  };
};

export default connect(
  mapStateToProps,
  { onTransactionHelp },
)(HelpIcon);
