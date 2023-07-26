/** @jsx h */
import { h } from 'preact';
import { connect } from 'react-redux';
import { tracker, UserActionType } from '../../tracking';
import onPaymentCancel from '../../actions/onPaymentCancel';
import actions from '../../actions/onPaymentCancel/actionType';
import style from './style.css';

const CancelTransactionButton = (props) => {
  const { pageKey, onPaymentCancel, metadata } = props || {};
  const onClickAction = () => {
    onPaymentCancel(actions.initiateCancellation);
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'cancel_transaction',
      pageKey,
      metadata,
    );
  };
  return (
    <div
      className={`font14 text60 text-center text-underline cursorPointer ${
        style.cancelLink
      }`}
      onClick={onClickAction}>
      Cancel Transaction
    </div>
  );
};
const mapStateToProps = ({ config }) => {
  const { pageKey, metadata } = config;
  return {
    pageKey,
    metadata,
  };
};

export default connect(
  mapStateToProps,
  { onPaymentCancel },
)(CancelTransactionButton);
