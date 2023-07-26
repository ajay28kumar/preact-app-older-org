import registrationController from '../../api/controllers/registrationController';
import {
  loginActionType,
  registrationConfirmActionType,
  registrationInitActionType,
} from '../../actionTypes';
import showSnackBar from '../commonAction/showSnackBar';
import { removeBlankKeys } from '../../components/material-ui/helper';

export default ({ type, otpType, mobile, userIdentifier, lenderId }) => (
  dispatch,
) => {
  const data = removeBlankKeys({
    actionType: type,
    lenderId,
    mobile,
    userIdentifier,
  });
  if (otpType !== 'manual') {
    dispatch({
      type:
        registrationConfirmActionType.POST_PARTIAL_REGISTRATION_SEND_OTP_REQUEST,
      payload: {},
    });
  }
  registrationController
    .postVerifyMobileSendOTP(data)
    .then((response) => {
      const { mobileEndingDigits } = response.data || {};
      if (!mobile) {
        dispatch({
          type: loginActionType.UPDATE_MOBILE_NUMBER,
          payload: removeBlankKeys({ mobile: mobileEndingDigits }),
        });
      }
      if (otpType === 'manual') {
        return dispatch(
          showSnackBar({
            message: `OTP sent to ${mobile}`,
            type: 'success',
          }),
        );
      }
      dispatch({
        type: registrationInitActionType.POST_REGISTRATION_INITIATE_SUCCESS,
        payload: {},
      });
    })
    .catch(({ data }) => {
      const { message } = data || {};
      dispatch(
        showSnackBar({
          message,
          type: 'error',
        }),
      );
    });
};
