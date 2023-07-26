import { apiStatus, offerActionType } from '../../../actionTypes';

const initialState = {
  apiState: apiStatus.NONE,
  uiComponents: [],
};

const offer = (state = initialState, action) => {
  switch (action.type) {
    case offerActionType.OFFER_SCREEN_INITIATE:
      return {
        ...state,
        apiState: apiStatus.INITIATED,
      };
    case offerActionType.OFFER_SCREEN_SUCCESS:
      const { uiComponents, banners, offers } = action.payload || {};
      return {
        ...state,
        apiState: apiStatus.SUCCESS,
        uiComponents,
        banners,
        offers,
      };
    case offerActionType.OFFER_SCREEN_ERROR:
      return {
        ...state,
        apiState: apiStatus.ERROR,
      };
    default:
      return state;
  }
};

export default offer;
