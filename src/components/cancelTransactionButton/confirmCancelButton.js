/** @jsx h */
import { h } from 'preact';
import { connect } from 'react-redux';
import { tracker, UserActionType } from '../../tracking';
import onPaymentCancel from '../../actions/onPaymentCancel';
import actionType from '../../actions/onPaymentCancel/actionType';
import style from './style.css';

const ConfirmCancelButton = (props) => {
  const onClickAction = () => {
    props.onPaymentCancel(actionType.confirmCancellation);
    tracker.trackUserInteraction(
      UserActionType.CLICK,
      'confirm_cancel',
      props.pageKey,
      props.metadata,
    );
  };
  return (
    <div className={style.cancelButtonContainer}>
      <div
        className='font14 text80 text-center text-underline cursorPointer'
        onClick={onClickAction}>
        Cancel Transaction
      </div>
    </div>
  );
};

export default connect(
  null,
  { onPaymentCancel },
)(ConfirmCancelButton);
