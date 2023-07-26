import {
  apiStatus,
  modalActionType,
  paymentCancelActionType,
} from '../../actionTypes';

const initialState = {
  apiState: apiStatus.NONE,
  errorMessage: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case paymentCancelActionType.CANCEL_TRANSACTION_REQUEST:
      return {
        ...state,
        apiState: apiStatus.INITIATED,
      };
    case paymentCancelActionType.CANCEL_TRANSACTION_SUCCESS:
      return {
        ...state,
        apiState: apiStatus.SUCCESS,
      };
    case paymentCancelActionType.CANCEL_TRANSACTION_ERROR:
      return {
        ...state,
        apiState: apiStatus.ERROR,
        errorMessage: action.payload.errorMessage,
      };
    case modalActionType.HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}
