import { brandActionType } from '../../actionTypes';
import { getBrands } from '../../api/controllers/buyWithInstacredController';

export default ({ lenderId, campaignId }) => (dispatch) => {
  dispatch({
    type: brandActionType.INIT_BRAND_SCREEN_REQUEST,
    payload: { campaignId },
  });
  getBrands({ lenderId })
    .then(({ data }) => {
      dispatch({
        type: brandActionType.INIT_BRAND_SCREEN_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: brandActionType.INIT_BRAND_SCREEN_ERROR,
        payload: {},
      });
    });
};
