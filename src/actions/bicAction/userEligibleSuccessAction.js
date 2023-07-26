import { route } from 'preact-router';
import { loginRoute } from '../../alias/homeRoutes';
import { lenderNewUserRoute } from '../../alias/activationRoutes';
import { homeActionType } from '../../actionTypes';
import initiateLogin from '../onLogin/initiateLogin';
import { getLocalstorage, setLocalStorage } from '../../utils';

export const userEligibleSuccessAction = (responseData) => (dispatch) => {
  const { isEligible, lenders, userStatus, mobile } = responseData || {};
  if (isEligible) {
    if (userStatus === 'PRE_APPROVED') {
      //redirected user to activation flow
      if (lenders) {
        const id = lenders[0];
        const lenderId = id.toString();
        return route(`${lenderNewUserRoute.path}?lenderId=${lenderId}`);
      }
    }
    //user is eligible and needs to login
    dispatch(initiateLogin({ mobile, gatewayMerchantId: null }));
    //Need to add delay so that init-login action will get called and after that mobile number will populate in URL from redux-store
    return setTimeout(() => {
      route(loginRoute.path);
    });
  } else {
    const errorMessage =
      'Entered number is not eligible. Please provide your number registered with one of our banking partners';
    dispatch({
      type: homeActionType.SUD_API_ERROR,
      payload: { errorMessage },
    });
    const attemptsRemaining = getLocalstorage('attemptsRemaining')
      ? parseInt(getLocalstorage('attemptsRemaining'), 10)
      : 2;
    if (attemptsRemaining > 0) {
      setLocalStorage('attemptsRemaining', (attemptsRemaining - 1).toString());
      setTimeout(() => {
        dispatch({ type: homeActionType.SUD_STATUS_RESET, payload: {} });
      }, 3000);
    }
  }
};
