import { commonActionType } from '../../actionTypes';
import paymentFailureAction from './actionType';

export default (actionType) => (dispatch) => {
  switch (actionType) {
    case paymentFailureAction.initialize:
      return dispatch({
        type: commonActionType.INIT_QUERY,
        payload: { shouldShowHeader: false, shouldShowTimer: false },
      });
    default:
      return console.error(
        `missing case onPaymentFailure handle for ${actionType}`,
      );
  }
};
