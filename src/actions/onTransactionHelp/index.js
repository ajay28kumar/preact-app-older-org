import { modalActionType, paymentHelpText } from '../../actionTypes';
import { modalType } from '../onModalAction/actionType';

export default ({ transactionHelpTitle, helpText }) => (dispatch) => {
  dispatch({
    type: modalActionType.SHOW_MODAL,
    payload: { modalType: modalType.helpTransactionModal, payload: {} },
  });
  return dispatch({
    type: paymentHelpText.DISPLAY_HELP_TEXT,
    payload: { transactionHelpTitle, helpText },
  });
};
