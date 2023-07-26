import { commonActionType } from '../../actionTypes';
import paymentSuccessAction from './actionType';

export default (actionType) => (dispatch) => {
  switch (actionType) {
    case paymentSuccessAction.initialize:
      return dispatch({
        type: commonActionType.INIT_QUERY,
        payload: {
          shouldShowHeader: false,
          shouldShowTransactionDetails: false,
          shouldShowTimer: false,
        },
      });
    default:
      return console.error(`missing case handle for ${actionType}`);
  }
};
