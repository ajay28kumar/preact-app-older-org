import {
  apiStatus,
  changePinActionType,
  commonActionType,
} from '../../actionTypes';

const initialState = {
  changePinApiState: apiStatus.NONE,
  errorMessage: '',
};

const changePin = (state = initialState, action) => {
  switch (action.type) {
    case changePinActionType.POST_CHANGE_PIN_API_INITIATE:
      return {
        ...state,
        changePinApiState: apiStatus.INITIATED,
        errorMessage: '',
      };
    case changePinActionType.POST_CHANGE_PIN_API_SUCCESS:
      return {
        ...state,
        changePinApiState: apiStatus.SUCCESS,
        errorMessage: '',
      };
    case changePinActionType.POST_CHANGE_PIN_API_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...state,
        changePinApiState: apiStatus.ERROR,
        errorMessage,
      };
    }
    case changePinActionType.CHANGE_PIN_UPDATE_ERROR_MESSAGE: {
      const { errorMessage } = action.payload;
      return {
        ...state,
        errorMessage,
      };
    }
    case commonActionType.CLEAR_STORE:
      return initialState;
    default:
      return state;
  }
};

export default changePin;
