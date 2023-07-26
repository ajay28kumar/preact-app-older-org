import actionType from './actionType';
import { headerActionType } from '../../actionTypes';

export default (action: string) => (dispatch) => {
  switch (action) {
    case actionType.headerFixed:
      return dispatch({
        type: headerActionType.FIXED_HEADER,
        payload: {},
      });
    case actionType.removeFixedHeader:
      return dispatch({
        type: headerActionType.REMOVE_FIXED_HEADER,
        payload: {},
      });
    default:
      console.error(`Handle Case for ${action} in headerAction`);
      return null;
  }
};
