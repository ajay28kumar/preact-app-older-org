import registrationController from '../../api/controllers/registrationController';
import { registrationInitActionType } from '../../actionTypes';
import { getUtmCampaign } from '../../utils/lenderTheme';

export default (actionPayload) => (dispatch) => {
  const { lenderId } = actionPayload || {};
  dispatch({
    type: registrationInitActionType.INITIATE_CAMPAIGN_REQUEST,
    payload: { lenderId },
  });

  const campaignId = getUtmCampaign() || lenderId;
  registrationController
    .getCampaignDetails({ campaignId, uiGroup: 'LANDING_PAGE' })
    .then(({ data }) => {
      const { customAttributes } = data || {};
      const {
        backgroundDesktopImg,
        backgroundImg,
        benefitImg,
        merchantLogo,
      } = customAttributes;
      const payload = {
        backgroundDesktopImg,
        backgroundImg,
        benefitImg,
        merchantLogo,
      };
      return dispatch({
        type: registrationInitActionType.INITIATE_CAMPAIGN_SUCCESS,
        payload,
      });
    })
    .catch((error) => {
      return dispatch({
        type: registrationInitActionType.INITIATE_CAMPAIGN_ERROR,
        payload: {},
      });
    });
};
