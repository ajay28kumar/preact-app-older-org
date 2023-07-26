//@flow
import actionType from './actionType';
import { removeBlankKeys } from '../../components/material-ui/helper';
import getBIC from './getBIC';
import {
  bicActionType,
  commonActionType,
  homeActionType,
} from '../../actionTypes';
import getUserEligiblity from '../checkUserEligibility';
import { userEligibleSuccessAction } from './userEligibleSuccessAction';
import { userEligibleFail } from './userEligibilityFail';

export default (action: string, actionPayload?: Object) => (
  dispatch: Function,
) => {
  switch (action) {
    case actionType.initializeBIC:
      const { campaignId, merchantHandle, shouldFetchApi } =
        actionPayload || {};
      if (shouldFetchApi) {
        const query = {
          merchantHandle,
          campaignId,
        };
        dispatch(getBIC(removeBlankKeys(query)));
      }
      return dispatch({ type: bicActionType.INIT_BIC_SCREEN, payload: {} });
    case actionType.toggleFilter:
      return dispatch({
        type: homeActionType.TOGGLE_FILTER,
        payload: {},
      });
    case actionType.initializeFaqScreen: {
      const { campaignId, lenderDetails } = actionPayload || {};
      if (lenderDetails) {
        dispatch({
          type: commonActionType.STORE_DATA,
          payload: { lenderDetails },
        });
      }
      return dispatch({
        type: homeActionType.INIT_FAQ_SCREEN,
        payload: { campaignId },
      });
    }
    case actionType.initializeChangePin: {
      const { campaignId } = actionPayload || {};
      return dispatch({
        type: homeActionType.INIT_CHANGE_PIN_SCREEN,
        payload: { campaignId },
      });
    }
    case actionType.initializeHTB: {
      const { campaignId } = actionPayload || {};
      return dispatch({
        type: homeActionType.INIT_HTB_SCREEN,
        payload: { campaignId },
      });
    }
    case actionType.initializeVoucher: {
      const { campaignId } = actionPayload || {};
      return dispatch({
        type: homeActionType.INIT_VOUCHER_SCREEN,
        payload: { campaignId },
      });
    }
    case actionType.initializeLogin: {
      dispatch({
        type: commonActionType.CLEAR_STORE,
        payload: {},
      });
      return setTimeout(() => {
        const { campaignId } = actionPayload || {};
        dispatch({
          type: homeActionType.INIT_LOGIN_SCREEN,
          payload: { campaignId },
        });
      });
    }
    case actionType.initializeTransactionHistory: {
      const { campaignId } = actionPayload || {};
      return dispatch({
        type: homeActionType.INIT_TRANSACTION_HISTORY,
        payload: { campaignId },
      });
    }
    case actionType.checkUserEligible:
      const { mobile, ignoreCookie, gatewayMerchantId } = actionPayload || {};
      return dispatch(
        getUserEligiblity(
          { mobile, ignoreCookie, gatewayMerchantId },
          userEligibleSuccessAction,
          userEligibleFail,
        ),
      );
    case actionType.updateSearchText:
      const { searchText } = actionPayload || {};
      return dispatch({
        type: bicActionType.UPDATE_SEARCH_TEXT,
        payload: { searchText },
      });
    case actionType.initializeBICSearch: {
      const { campaignId } = actionPayload || {};
      return dispatch({
        type: bicActionType.INIT_BIC_SEARCH_SCREEN,
        payload: { campaignId },
      });
    }
    case actionType.clickCategorySeeMore:
      return dispatch({
        type: bicActionType.CLICK_CATEGORY_SEE_MORE,
        payload: {
          selected: 'category',
        },
      });
    case actionType.clickBrandsSeeMore:
      return dispatch({
        type: bicActionType.CLICK_BRAND_SEE_MORE,
        payload: {
          selected: 'brand',
        },
      });
    case actionType.clickBrands:
      const { brandIds } = actionPayload || {};
      return dispatch({
        type: bicActionType.CLICK_BRAND,
        payload: { brandIds },
      });

    default:
      return null;
  }
};
