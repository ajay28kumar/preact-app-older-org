import actions from './actionType';
import { modalActionType } from '../../actionTypes';
export default (actionType) => (dispatch) => {
  switch (actionType) {
    case actions.closeModal:
      return dispatch({
        type: modalActionType.HIDE_MODAL,
        payload: {},
      });
    default:
      return null;
  }
};
