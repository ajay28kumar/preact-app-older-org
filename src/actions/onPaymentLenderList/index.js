import paymentInitAction from './actionType';
import {
  commonActionType,
  lenderListActionType,
  TRACKING_TRANSACTION,
  paymentInitActionType,
} from '../../actionTypes';
import trackingAction from '../trackingAction';
import { trackingStage } from '../../utils/trackingStage';

export default (actionType, ...args) => (dispatch, getState) => {
  switch (actionType) {
    case paymentInitAction.initialize: {
      const { config, paymentDetails } = getState() || {};
      const { txnUuid } = config || {};
      const { mobile } = paymentDetails || {};

      const trackingPayload = {
        txnUUID: txnUuid,
        txnStage: trackingStage.LENDER_SELECTION,
        mobile: mobile,
      };

      trackingAction(TRACKING_TRANSACTION, trackingPayload);

      dispatch({
        type: paymentInitActionType.TRANSACTION_INFO_CLEAR_SELECTED_LENDER_EMI,
      });

      return dispatch({
        type: commonActionType.INIT_QUERY,
        payload: {
          shouldShowHeader: false,
          shouldShowDrawer: false,
          shouldShowTransactionDetails: true,
        },
      });
    }
    case paymentInitAction.onLenderSelection:
      const selectedLender = args[0];

      return dispatch({
        type: lenderListActionType.SELECT_LENDER,
        payload: { selectedLender },
      });
    default:
      return console.log(
        `missing case handle for actionType is : ${actionType}`,
      );
  }
};
