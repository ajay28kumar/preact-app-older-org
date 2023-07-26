import actions from './actionType';
import { aboutUsActionType } from '../../actionTypes';

export default (actionType, actionPayload) => (dispatch) => {
  switch (actionType) {
    case actions.initAboutUs:
      const { campaignId } = actionPayload || {};
      return dispatch({
        type: aboutUsActionType.INIT_ABOUT_US,
        payload: {
          campaignId,
        },
      });
    default:
      return null;
  }
};
