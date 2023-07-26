import {
  modalActionType,
  errorBlockTransactionDisplay,
} from '../../actionTypes';
import { modalType } from '../onModalAction/actionType';

export default ({ helpText, title, message, cta, errorType }) => (dispatch) => {
  dispatch({
    type: modalActionType.SHOW_MODAL,
    payload: { modalType: modalType.errorBlockTransactionModal },
  });
  return dispatch({
    type: errorBlockTransactionDisplay.DISPLAY_HELP_TEXT,
    payload: { helpText, title, message, cta, errorType },
  });
};
