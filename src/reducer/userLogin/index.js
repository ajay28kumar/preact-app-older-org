import {
  apiStatus,
  commonActionType,
  homeActionType,
  loginActionType,
} from '../../actionTypes';

const initialState = {
  isLoggedIn: false,
  loginInitApiState: apiStatus.NONE,
  loginAuthApiState: apiStatus.NONE,
  mobileNo: '',
  errorMessage: '',
};

const userLogin = (state = initialState, action) => {
  switch (action.type) {
    case loginActionType.INITIATE_LOGIN_REQUEST:
      return {
        ...state,
        loginInitApiState: apiStatus.INITIATED,
      };
    case loginActionType.INITIATE_LOGIN_SUCCESS:
      const { mobileNo } = action.payload;
      return {
        ...state,
        loginInitApiState: apiStatus.SUCCESS,
        mobileNo,
      };
    case loginActionType.INITIATE_LOGIN_ERROR:
      const { errorMessage } = action.payload;
      return {
        ...state,
        loginInitApiState: apiStatus.ERROR,
        errorMessage,
      };
    case loginActionType.VERIFY_AUTH_REQUEST:
      return {
        ...state,
        loginAuthApiState: apiStatus.INITIATED,
      };
    case loginActionType.VERIFY_AUTH_SUCCESS: {
      const { isLoggedIn, mobile } = action.payload;
      return {
        ...state,
        isLoggedIn,
        mobileNo: mobile,
        loginAuthApiState: apiStatus.SUCCESS,
      };
    }
    case loginActionType.VERIFY_AUTH_ERROR: {
      const { errorMessage } = action.payload;
      return {
        ...state,
        errorMessage,
        loginAuthApiState: apiStatus.ERROR,
      };
    }
    case loginActionType.RESET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: '',
        loginAuthApiState: apiStatus.NONE,
        loginInitApiState: apiStatus.NONE,
      };
    case commonActionType.CLEAR_STORE:
      return initialState;
    default:
      return state;
  }
};

export default userLogin;
