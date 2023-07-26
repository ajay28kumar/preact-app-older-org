import { HIDE_SNACKBAR, SHOW_SNACKBAR } from '../../../actionTypes';

const initialState = {
  showSnackBar: false,
  message: '',
  type: '',
  callBackAction: undefined,
};

const snackBar = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      const { message, type, callBackAction } = action.payload || {};
      return {
        ...state,
        showSnackBar: true,
        message,
        type,
        callBackAction,
      };
    case HIDE_SNACKBAR:
      return initialState;
    default:
      return state;
  }
};

export default snackBar;
