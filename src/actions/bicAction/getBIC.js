// @flow
import { getBICData } from '../../api/controllers/buyWithInstacredController';
import { bicActionType } from '../../actionTypes';

export default (payload: Object) => (dispatch: Function) => {
  dispatch({ type: bicActionType.GET_BIC_API_INITIATED, payload });
  getBICData(payload)
    .then(({ data: respData }) => {
      return dispatch({
        type: bicActionType.GET_BIC_API_SUCCESS,
        payload: respData,
      });
    })
    .catch((error) => {
      return dispatch({ type: bicActionType.GET_BIC_API_ERROR, payload: {} });
    });
};
