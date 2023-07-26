import { initiateLoginController } from '../../api/controllers/loginController';
import apiErrorType from '../../api/apiErrorType';
import getUserEligibility from '../checkUserEligibility';
import { loginActionType } from '../../actionTypes';

const initiateLogin = (data) => (dispatch) => {
  dispatch({
    type: loginActionType.INITIATE_LOGIN_REQUEST,
    payload: {},
  });
  initiateLoginController(data)
    .then(() => {
      dispatch({
        type: loginActionType.INITIATE_LOGIN_SUCCESS,
        payload: {
          mobileNo: data.mobile,
        },
      });
      return dispatch(
        getUserEligibility({
          mobile: data.mobile,
          ignoreCookie: null,
          gatewayMerchantId: data.gatewayMerchantId,
        }),
      );
    })
    .catch(({ data: error }) => {
      const { errorCode, message } = error || {};
      dispatch({
        type: loginActionType.INITIATE_LOGIN_ERROR,
        payload: {
          errorMessage:
            errorCode === apiErrorType.USER_NOT_REGISTERED
              ? 'Mobile not eligible. Please enter mobile registered with one of our lending partners'
              : message,
        },
      });
      if (errorCode === apiErrorType.USER_NOT_REGISTERED) {
        dispatch(
          getUserEligibility({
            mobile: data.mobile,
            ignoreCookie: null,
            gatewayMerchantId: data.gatewayMerchantId,
          }),
        );
      }
    });
};

export default initiateLogin;
