import registrationController from '../../api/controllers/registrationController';
import { registrationSecondFactorType } from '../../actionTypes';
import apiErrorType from '../../api/apiErrorType';
import { tracker } from '../../tracking';
import { setSessionStorage } from '../../utils';

export default ({ source, aivfValue }) => (dispatch, getState) => {
  dispatch({
    type: registrationSecondFactorType.POST_VERIFY_CREDIT_LINE_REQUEST,
    payload: {},
  });
  const { lenderId } = getState().registrationUserData;
  const { pageKey } = getState().config;
  const data = {
    aivfValue,
    nav: { src: source },
  };
  registrationController
    .postVerifyCreditLine(data, { lenderId })
    .then((resp) => {
      const { pinAuthToken } = resp.data.data || {};
      setSessionStorage('pinAuthToken', pinAuthToken);
      const { nav } = resp.data || {};
      const { next } = nav || {};
      if (next === 'BIC') {
        tracker.trackImpression('PIN Already Setup', pageKey);
      }
      dispatch({
        type: registrationSecondFactorType.POST_VERIFY_CREDIT_LINE_SUCCESS,
        payload: {},
      });
    })
    .catch(({ data }) => {
      const { message, errorCode } = data || {};
      if (errorCode === apiErrorType.ACTIVATION_EXHAUSTED) {
        return dispatch({
          type: registrationSecondFactorType.POST_INITIATE_CREDIT_LINE_ERROR,
          payload: {
            errorMessage: message,
          },
        });
      }
      dispatch({
        type: registrationSecondFactorType.POST_VERIFY_CREDIT_LINE_ERROR,
        payload: { errorMessage: message },
      });
    });
};
