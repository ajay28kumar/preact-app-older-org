import { homeActionType } from '../../actionTypes';
import { getLocalstorage, setLocalStorage } from '../../utils';

export const userEligibleFail = () => (dispatch) => {
  const errorMessage = 'System Error, Please try again later';
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
};
