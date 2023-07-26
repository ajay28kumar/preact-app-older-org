import {
  apiStatus,
  bicActionType,
  brandActionType,
  categoryActionType,
  commonActionType,
  homeActionType,
  merchantActionType,
  offerActionType,
} from '../../../actionTypes';

const initialState = {
  apiState: apiStatus.NONE,
  searchText: '',
  campaignId: undefined,
  merchantHandle: '',
  uiComponents: [],
  banners: [],
  subcategories: [],
  merchants: [],
  brands: [],
  categories: [],
  offers: [],
  howToBuy: {},
  branchLocator: {},
  customAttributes: {},
  merchantMetadata: {},
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case commonActionType.INIT_QUERY:
      const { utmCampaign } = action.payload || {};
      return {
        ...state,
        campaignId: utmCampaign || state.campaignId,
      };
    case bicActionType.GET_BIC_API_INITIATED:
      return {
        ...state,
        apiState: apiStatus.INITIATED,
        ...action.payload,
      };
    case bicActionType.GET_BIC_API_SUCCESS:
      const { merchants, brands, categories, ...others } = action.payload || {};
      return {
        ...state,
        apiState: apiStatus.SUCCESS,
        merchants,
        brands,
        categories,
        ...others,
      };
    case bicActionType.GET_BIC_API_ERROR:
      return {
        ...state,
        apiState: apiStatus.ERROR,
      };
    case offerActionType.OFFER_SCREEN_INITIATE:
    case homeActionType.INIT_FAQ_SCREEN:
    case homeActionType.INIT_CHANGE_PIN_SCREEN:
    case homeActionType.INIT_HTB_SCREEN:
    case homeActionType.INIT_VOUCHER_SCREEN:
    case homeActionType.INIT_TRANSACTION_HISTORY:
    case homeActionType.INIT_LOGIN_SCREEN:
    case categoryActionType.INIT_CATEGORY_SCREEN_REQUEST:
    case brandActionType.INIT_BRAND_SCREEN_REQUEST:
    case merchantActionType.INIT_MERCHANT_SCREEN_REQUEST:
    case bicActionType.INIT_BIC_SEARCH_SCREEN:
      const { campaignId } = action.payload;
      return {
        ...state,
        campaignId: campaignId || state.campaignId,
      };
    case bicActionType.UPDATE_SEARCH_TEXT:
      const { searchText } = action.payload;
      return {
        ...state,
        searchText,
      };
    case commonActionType.CLEAR_STORE:
      return initialState;
    default:
      return state;
  }
};

export default home;
