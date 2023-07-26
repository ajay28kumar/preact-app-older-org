import { apiStatus, howToBuyActionType } from '../../../actionTypes';

const initialState = {
  referralUrl: '',
  data: {},
};

const howToBuy = (state = initialState, action) => {
  switch (action.type) {
    case howToBuyActionType.REDIRECT_HOW_TO_BUY:
      const { referralUrl } = action.payload || {};
      return {
        ...state,
        referralUrl,
      };
    case howToBuyActionType.GET_HOW_TO_BUY_REQUEST:
      const { handle } = action.payload || {};
      return {
        ...state,
        data: {
          ...state.data,
          [handle]: {
            apiState: apiStatus.INITIATED,
          },
        },
      };
    case howToBuyActionType.GET_HOW_TO_BUY_SUCCESS: {
      const { handle, ...howToBuyData } = action.payload || {};
      return {
        ...state,
        data: {
          ...state.data,
          [handle]: {
            apiState: apiStatus.SUCCESS,
            ...howToBuyData,
          },
        },
      };
    }
    case howToBuyActionType.GET_HOW_TO_BUY_ERROR: {
      const { handle } = action.payload || {};
      return {
        ...state,
        data: {
          ...state.data,
          [handle]: {
            apiState: apiStatus.ERROR,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default howToBuy;
