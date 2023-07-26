import {
  modalActionType,
  errorBlockTransactionDisplay,
} from '../../actionTypes';

const initialState = {
  helpText: '',
  title: '',
  message: '',
  cta: '',
  errorType: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case errorBlockTransactionDisplay.DISPLAY_HELP_TEXT:
      const { helpText, title, message, cta, errorType } = action.payload || {};
      return {
        ...state,
        helpText,
        title,
        message,
        cta,
        errorType,
      };
    case modalActionType.HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}
