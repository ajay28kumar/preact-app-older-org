import { ntbActionType } from '../../actionTypes';

export const lenderListFailureAction = (responseData) => (dispatch) => {
  const { message } = responseData || {};
  if (message) {
    const errorMessage = message;
    dispatch({
      type: ntbActionType.LENDER_LIST_FAILURE,
      payload: { errorMessage },
    });
    setTimeout(() => {
      dispatch({
        type: ntbActionType.LENDER_LIST_FAILURE,
        payload: '',
      });
    }, 3000);
  }
};
