import actions from './actionType';
import { privacyPolicyActionType } from '../../actionTypes';

export default (actionType, actionPayload) => (dispatch) => {
  switch (actionType) {
    case actions.initPrivacyPolicy:
      const { campaignId } = actionPayload || {};
      return dispatch({
        type: privacyPolicyActionType.INIT_PRIVACY_POLICY,
        payload: {
          campaignId,
        },
      });
    default:
      return null;
  }
};
