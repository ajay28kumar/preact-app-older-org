import actionType from './actionType';
import fetchHowToBuyDetails from './fetchHowTobuyDetails';
import { howToBuyActionType } from '../../actionTypes';

export default (action: string, payload?: Object) => (dispatch) => {
  switch (action) {
    case actionType.redirectToHTB:
      const { referralUrl } = payload || {};
      return dispatch({
        type: howToBuyActionType.REDIRECT_HOW_TO_BUY,
        payload: {
          referralUrl,
        },
      });
    case actionType.initHTBScreen:
      const { campaignId, lenderId, handle } = payload || {};
      return dispatch(fetchHowToBuyDetails({ campaignId, lenderId, handle }));
    default:
      console.error(`Handle Case for ${action} in headerAction`);
      return null;
  }
};
