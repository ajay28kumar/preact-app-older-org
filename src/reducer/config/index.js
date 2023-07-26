import {
  apiStatus,
  bicActionType,
  commonActionType,
  paymentConfirmActionType,
  paymentInitActionType,
  registrationInitActionType,
  setupPinInitActionType,
} from '../../actionTypes';
import { removeBlankKeys } from '../../components/material-ui/helper';
import { lenderTheme } from '../../utils/lenderTheme';

export const initialState = {
  shouldShowHeader: false,
  shouldShowDrawer: false,
  shouldShowTransactionDetails: false,
  shouldShowTimer: true,
  pageKey: '',
  txnUuid: '',
  sessionToken: '',
  template: '',
  theme: '',
  backRoute: '',
  userUUID: '',
  activationId: '',
  clientId: '',
  metadata: {},
  lenderDetails: {},
  routeDetails: {},
  experimentDetails: {
    apiState: apiStatus.NONE,
  },
};

const config = (state = initialState, action) => {
  switch (action.type) {
    case commonActionType.INIT_QUERY:
    case commonActionType.STORE_DATA:
      return {
        ...state,
        ...removeBlankKeys(action.payload),
      };
    case bicActionType.GET_BIC_API_SUCCESS:
      const { lenderDetails } = action.payload;
      if (lenderDetails) {
        const { id: lenderId } = lenderDetails;
        return {
          ...state,
          lenderDetails: lenderTheme[lenderId],
        };
      }
      return state;
    case commonActionType.UPDATE_PAGE_KEY:
      const { pageKey, metadata } = action.payload || {};
      return {
        ...state,
        pageKey,
        metadata,
      };
    case commonActionType.UPDATE_TEMPLATE:
      const { template, theme } = action.payload || {};
      return {
        ...state,
        template,
        theme,
      };
    case paymentConfirmActionType.VERIFY_SECOND_FACTOR_SUCCESS:
      const { sessionToken } = action.payload || {};
      return {
        ...state,
        sessionToken,
        backRoute: false,
      };
    case registrationInitActionType.INITIATE_ACTIVATION_DATA_SUCCESS:
      const { shouldShowHeader } = action.payload;
      return {
        ...state,
        shouldShowHeader,
      };
    case setupPinInitActionType.INITIATE_SETUP_PIN:
      return {
        ...state,
        shouldShowHeader: true,
      };
    case commonActionType.CHANGE_ROUTE:
      const { routeDetails } = action.payload || {};
      return {
        ...state,
        routeDetails,
      };
    case paymentInitActionType.TRANSACTION_VARIANT_BENEFIT_POPUP_RESPONSE:
      return {
        ...state,
        experimentDetails: {
          apiState: apiStatus.SUCCESS,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default config;
