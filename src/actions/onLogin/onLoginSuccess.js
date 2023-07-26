import Utils, { setLocalStorage, setSessionStorage } from '../../utils';
import { loginActionType } from '../../actionTypes';
import { tracker } from '../../tracking';

const onLoginSuccess = ({ authToken, mobile }) => (dispatch) => {
  Utils.saveAuthToken(authToken);
  setLocalStorage('userRegistered', 'true');
  setSessionStorage('authToken', authToken);
  setSessionStorage(
    'authDetails',
    JSON.stringify({
      login: true,
      mobile: mobile,
    }),
  );
  dispatch({
    type: loginActionType.VERIFY_AUTH_SUCCESS,
    payload: {
      isLoggedIn: true,
      mobile,
    },
  });
  tracker.pushUserProfile();
};

export default onLoginSuccess;
