import actions from './actionType';
import { ntbFaqActionType } from '../../actionTypes';

export default (actionType, actionPayload) => (dispatch) => {
  switch (actionType) {
    case actions.initNtbFaq:
      const { campaignId } = actionPayload || {};
      return dispatch({
        type: ntbFaqActionType.INIT_NTB_FAQ,
        payload: {
          campaignId,
        },
      });
    default:
      return null;
  }
};
