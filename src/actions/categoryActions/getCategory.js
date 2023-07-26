import { categoryActionType } from '../../actionTypes';
import { getCategories } from '../../api/controllers/buyWithInstacredController';

export default ({ lenderId, campaignId }) => (dispatch) => {
  dispatch({
    type: categoryActionType.INIT_CATEGORY_SCREEN_REQUEST,
    payload: { campaignId },
  });
  getCategories({ lenderId })
    .then(({ data }) => {
      dispatch({
        type: categoryActionType.INIT_CATEGORY_SCREEN_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: categoryActionType.INIT_CATEGORY_SCREEN_ERROR,
        payload: {},
      });
    });
};
