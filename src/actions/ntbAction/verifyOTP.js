import { verifyOTPController } from '../../api/controllers/ntbController';
import { loginActionType, ntbActionType } from '../../actionTypes';
import { removeBlankKeys } from '../../components/material-ui/helper';
import { tracker } from '../../tracking';
import Utils, { setLocalStorage, setSessionStorage } from '../../utils';
import onLoginSuccess from '../onLogin/onLoginSuccess';

export default (
  payload: Object,
  onSuccessAction?: Function,
  onFailAction?: Function,
) => (dispatch: Function) => {
  const { mobile, otp, amount, channel } = payload;
  const data = removeBlankKeys({
    amount,
    mobile: mobile,
    otp,
    channel,
  });
  verifyOTPController(data)
    .then(({ data: responseData }) => {
      const {
        message,
        emiInfoResponse,
        redirectUrl,
        isNTBEnabledOnMerchant,
        authToken,
      } = responseData || {};
      dispatch({
        type: ntbActionType.VERIFY_OTP_SUCCESS,
        payload: removeBlankKeys({ message }),
      });
      if (authToken) {
        dispatch(onLoginSuccess({ authToken, mobile }));
      }
      if (onSuccessAction)
        dispatch(
          onSuccessAction({
            ...data,
            message,
            emiInfoResponse,
            redirectUrl,
            isNTBEnabledOnMerchant,
          }),
        );
    })
    .catch((error) => {
      if (onFailAction) dispatch(onFailAction(error));
    });
};
