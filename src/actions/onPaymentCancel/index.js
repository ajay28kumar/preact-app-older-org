import actions from './actionType';
import { modalActionType, paymentCancelActionType } from '../../actionTypes';
import { initiateCancelTransaction } from './initiateCancel';
import { modalType } from '../onModalAction/actionType';

export default (actionType) => (dispatch) => {
  switch (actionType) {
    case actions.initiateCancellation:
      return dispatch({
        type: modalActionType.SHOW_MODAL,
        payload: { modalType: modalType.cancelTransactionModal },
      });
    case actions.rejectCancellation:
      return dispatch({
        type: paymentCancelActionType.REJECT_INITIATE_CANCEL_TRANSACTION,
        payload: {},
      });
    case actions.confirmCancellation:
      return dispatch(initiateCancelTransaction());
    default:
      return null;
  }
};
