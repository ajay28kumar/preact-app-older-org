import registrationController from '../../api/controllers/registrationController';
import { registrationSecondFactorType } from '../../actionTypes';

export default ({ source }) => (dispatch, getState) => {
  const { mobile, lenderId } = getState().registrationUserData;
  const data = {
    mobile,
    nav: { src: source },
  };
  dispatch({
    type: registrationSecondFactorType.POST_INITIATE_CREDIT_LINE_REQUEST,
    payload: {},
  });
  registrationController
    .postInitiateCreditLine(data, { lenderId })
    .then((response) => {
      const {
        aivfType,
        lenderLogo,
        lenderLogoIcon,
        theme,
        lenderName,
      } = response.data;
      dispatch({
        type: registrationSecondFactorType.POST_INITIATE_CREDIT_LINE_SUCCESS,
        payload: {
          aivfType,
          lenderLogo,
          lenderLogoIcon,
          lenderName,
          theme,
        },
      });
    })
    .catch(({ data }) => {
      const { message } = data || {};
      dispatch({
        type: registrationSecondFactorType.POST_INITIATE_CREDIT_LINE_ERROR,
        payload: {
          errorMessage: message,
        },
      });
    });
};
