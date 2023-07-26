import { sendOTPController } from '../../api/controllers/ntbController';
import { ntbActionType } from '../../actionTypes';
import { removeBlankKeys } from '../../components/material-ui/helper';

export default (
  payload: Object,
  onSuccessAction?: Function,
  onFailAction?: Function,
) => (dispatch: Function) => {
  const { mobile, merchantId, channel } = payload;
  const data = {
    mobile: mobile,
    merchantId,
    channel,
  };
  dispatch({ type: ntbActionType.SEND_OTP_REQUEST, payload: {} });
  sendOTPController(data)
    .then(({ data: responseData }) => {
      const { message } = responseData || {};
      dispatch({
        type: ntbActionType.SEND_OTP_SUCCESS,
        payload: removeBlankKeys({ message }),
      });
      if (onSuccessAction) dispatch(onSuccessAction(responseData));
    })
    .catch((error) => {
      if (onFailAction) dispatch(onFailAction(error));
    });
};
