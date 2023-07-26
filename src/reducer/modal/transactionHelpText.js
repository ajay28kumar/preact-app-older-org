import { modalActionType, paymentHelpText } from '../../actionTypes';

const initialState = {
  helpText: null,
  transactionHelpTitle: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case paymentHelpText.DISPLAY_HELP_TEXT:
      const { helpText, transactionHelpTitle } = action.payload || {};
      return {
        ...state,
        helpText,
        transactionHelpTitle,
      };
    case modalActionType.HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}
