import actionType from './actionType';
import getMerchants from './getMerchants';
import { merchantActionType } from '../../actionTypes';
import getCategory from '../categoryActions/getCategory';
import getBrands from '../brandsAction/getBrands';

export default (action, actionPayload) => (dispatch) => {
  switch (action) {
    case actionType.initializeSearchMerchants: {
      const { lenderId, categoryIds, brandIds, campaignId } = actionPayload;
      dispatch({
        type: merchantActionType.INIT_MERCHANT_SCREEN_REQUEST,
        payload: { categoryIds, brandIds, campaignId },
      });
      return dispatch(
        getMerchants({
          lenderId,
          categoryIds,
          brandIds,
          campaignId,
        }),
      );
    }
    case actionType.loadNextPageOfMerchantsInSearch:
      const { page } = actionPayload || {};
      return dispatch({
        type: merchantActionType.LOAD_MORE_MERCHANT,
        payload: { page },
      });
    case actionType.closeFilter:
      return dispatch({
        type: merchantActionType.CLOSE_FILTER,
      });

    case actionType.applyMerchantFilter: {
      const { lenderId, categoryIds, brandIds } = actionPayload;
      dispatch({
        type: merchantActionType.INIT_MERCHANT_SCREEN_REQUEST,
        payload: { categoryIds, brandIds },
      });
      dispatch(
        getMerchants({
          lenderId,
          categoryIds,
          brandIds,
        }),
      );
      return dispatch({
        type: merchantActionType.APPLY_MERCHANT_FILTER,
        payload: {},
      });
    }
    case actionType.fetchCategory: {
      const { lenderId } = actionPayload || {};
      return dispatch(getCategory({ lenderId }));
    }
    case actionType.fetchBrands: {
      const { lenderId } = actionPayload || {};
      return dispatch(getBrands({ lenderId }));
    }
    case actionType.clearText:
      return dispatch({
        type: merchantActionType.CLEAR_SEARCH_TEXT,
        payload: {},
      });
    default:
      return null;
  }
};
