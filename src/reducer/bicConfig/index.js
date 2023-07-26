import {
  bicActionType,
  headerActionType,
  homeActionType,
  merchantActionType,
  offerActionType,
  privacyPolicyActionType,
  aboutUsActionType,
  ntbFaqActionType,
} from '../../actionTypes';

const initialState = {
  isHeaderFixed: false,
  shouldShowBrandingHeader: false,
  shouldShowSearchBar: false,
  shouldShowFilterHeader: false,
  shouldShowFilter: false,
  filterOpen: false,
  totalNumberOfFilters: 0,
  shouldShowMenu: true,
  shouldDisplayBackButton: false,
  selected: 'brand',
  title: '',
};

const bicConfig = (state = initialState, action) => {
  const { isHeaderFixed } = state;
  switch (action.type) {
    case bicActionType.INIT_BIC_SCREEN:
      return {
        ...initialState,
        isHeaderFixed,
        shouldShowBrandingHeader: true,
        shouldShowSearchBar: true,
      };
    case bicActionType.INIT_BIC_SEARCH_SCREEN:
      return {
        ...state,
        shouldShowBrandingHeader: false,
        shouldShowFilter: true,
        shouldDisplayBackButton: true,
        shouldShowSearchBar: true,
        isHeaderFixed: true,
      };
    case offerActionType.OFFER_SCREEN_INITIATE:
    case privacyPolicyActionType.INIT_PRIVACY_POLICY:
      return {
        ...initialState,
        isHeaderFixed,
        shouldShowBrandingHeader: true,
      };
    case homeActionType.TOGGLE_FILTER:
      return {
        ...state,
        filterOpen: !state.filterOpen,
        shouldShowSearchBar: state.filterOpen,
      };
    case homeActionType.INIT_FAQ_SCREEN:
    case homeActionType.INIT_CHANGE_PIN_SCREEN:
    case homeActionType.INIT_TRANSACTION_HISTORY:
      return {
        ...initialState,
        isHeaderFixed,
        shouldShowBrandingHeader: true,
      };
    case homeActionType.INIT_VOUCHER_SCREEN:
    case homeActionType.INIT_LOGIN_SCREEN:
      return {
        ...initialState,
        isHeaderFixed,
        shouldShowBrandingHeader: true,
        shouldShowMenu: false,
      };
    case aboutUsActionType.INIT_ABOUT_US:
      return {
        ...initialState,
        isHeaderFixed: false,
        shouldShowBrandingHeader: true,
        shouldShowMenu: true,
      };
    case headerActionType.FIXED_HEADER:
      return {
        ...state,
        isHeaderFixed: true,
      };
    case headerActionType.REMOVE_FIXED_HEADER:
      return {
        ...state,
        isHeaderFixed: false,
      };
    case homeActionType.INIT_HTB_SCREEN:
      return {
        ...initialState,
        isHeaderFixed: true,
      };
    case bicActionType.CLICK_CATEGORY_SEE_MORE:
    case bicActionType.CLICK_BRAND_SEE_MORE:
      const { selected } = action.payload || {};
      return {
        ...initialState,
        isHeaderFixed: true,
        filterOpen: true,
        selected,
        shouldShowSearchBar: false,
      };
    case merchantActionType.APPLY_MERCHANT_FILTER:
      return {
        ...initialState,
        filterOpen: false,
        isHeaderFixed: true,
        shouldShowSearchBar: true,
      };
    case merchantActionType.CLOSE_FILTER:
      return {
        ...initialState,
        shouldShowSearchBar: true,
        filterOpen: false,
        isHeaderFixed: true,
      };
    case ntbFaqActionType.INIT_NTB_FAQ:
      return {
        ...initialState,
        isHeaderFixed: false,
        shouldShowBrandingHeader: true,
        shouldShowMenu: true,
      };
    default:
      return state;
  }
};

export default bicConfig;
