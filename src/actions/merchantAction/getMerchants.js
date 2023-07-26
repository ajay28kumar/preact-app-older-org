import { merchantActionType } from '../../actionTypes';
import { getMerchants } from '../../api/controllers/buyWithInstacredController';

export default (payload) => (dispatch) => {
  const { lenderId, categoryIds, brandIds, campaignId } = payload || {};
  const requestBody = {
    categoryIds: categoryIds || [],
    brandIds: brandIds || [],
  };
  getMerchants(requestBody, { lenderId: lenderId || undefined, campaignId })
    .then(({ data }) => {
      dispatch({
        type: merchantActionType.INIT_MERCHANT_SCREEN_SUCCESS,
        payload: {
          data,
          categoryIds,
          brandIds,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: merchantActionType.INIT_MERCHANT_SCREEN_ERROR,
        payload: {},
      });
    });
};
