import { ntbActionType } from '../../actionTypes';

export const lenderListSuccessAction = (responseData) => (dispatch) => {
  dispatch({
    type: ntbActionType.INIT_LENDER_LIST_SCREEN,
    payload: responseData,
  });
};
