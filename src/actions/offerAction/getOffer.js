//@flow
import { offerActionType } from '../../actionTypes';
import { getOffersController } from '../../api/controllers/buyWithInstacredController';

export default ({ campaignId }: Object) => (dispatch: Function) => {
  dispatch({
    type: offerActionType.OFFER_SCREEN_INITIATE,
    payload: { campaignId },
  });
  getOffersController({ campaignId })
    .then((resp) => {
      dispatch({
        type: offerActionType.OFFER_SCREEN_SUCCESS,
        payload: resp.data,
      });
    })
    .catch(() => {
      dispatch({
        type: offerActionType.OFFER_SCREEN_ERROR,
        payload: {},
      });
    });
};
