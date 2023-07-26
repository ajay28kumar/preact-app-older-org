import { commonActionType } from '../../actionTypes';
import { removeBlankKeys } from '../../components/material-ui/helper';
import actionType from '../onAppInit/actionType';
import { getSessionStorage } from '../../utils';

export default (action, ...actionPayload) => (dispatch) => {
  switch (action) {
    case actionType.initialize:
      const utmCampaign = getSessionStorage('utmCampaign');
      const txnUuid = getSessionStorage('txnUuid');
      const { lenderDetails } = actionPayload[0] || {};
      const payload = removeBlankKeys({
        utmCampaign,
        txnUuid,
        lenderDetails,
      });
      return dispatch({ type: commonActionType.STORE_DATA, payload: payload });
    case actionType.updateTemplate:
      const { template, theme } = actionPayload[0];
      return dispatch({
        type: commonActionType.UPDATE_TEMPLATE,
        payload: { template, theme },
      });
    default:
      return console.error(`appInit is missing handle of action ${action}`);
  }
};
