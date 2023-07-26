import registrationController from '../../api/controllers/registrationController';
import { registrationInitActionType } from '../../actionTypes';
import showSnackBar from '../commonAction/showSnackBar';
import apiErrorType from '../../api/apiErrorType';
import { tracker } from '../../tracking';
import { removeBlankKeys } from '../../components/material-ui/helper';

export default ({ source, mobile, shopLater, otpInitiate, campaignId }) => (
  dispatch,
  getState,
) => {
  const { lenderId, mobile: mobileNumber } = getState().registrationUserData;
  const { pageKey } = getState().config;
  const payload = {
    mobile: mobile || mobileNumber,
    lenderId,
    campaignId,
    nav: { src: source },
  };
  if (otpInitiate !== 'manual') {
    dispatch({
      type: registrationInitActionType.POST_REGISTRATION_INITIATE_REQUEST,
      payload: { shopLater },
    });
  }
  return registrationController
    .postRegistrationInit(removeBlankKeys(payload))
    .then(({ data }) => {
      const { nav } = data || {};
      const { next } = nav || {};
      if (next === 'BIC') {
        tracker.trackImpression('User Already Registered', pageKey);
      }
      if (otpInitiate === 'manual') {
        return dispatch(
          showSnackBar({ message: `OTP sent to ${mobile || mobileNumber}` }),
        );
      }
      dispatch({
        type: registrationInitActionType.POST_REGISTRATION_INITIATE_SUCCESS,
        payload,
      });
    })
    .catch(({ data }) => {
      const { message, errorCode } = data || {};
      if (errorCode === apiErrorType.ACTIVATION_USER_TEMPORARY_BLOCK) {
        return dispatch({
          type: registrationInitActionType.INITIATE_ACTIVATION_DATA_ERROR,
          payload: {
            errorMessage: message,
          },
        });
      }
      dispatch({
        type: registrationInitActionType.POST_REGISTRATION_INITIATE_ERROR,
        payload: {
          errorMessage: message,
        },
      });
    });
};
