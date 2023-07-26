import {
  commonActionType,
  paymentEmiActionType,
  TRACKING_TRANSACTION,
} from '../../actionTypes';
import paymentEmiAction from './actionType';
import { paymentLenderListRoute } from '../../alias/paymentRoutes';
import trackingAction from '../trackingAction';
import { trackingStage } from '../../utils/trackingStage';

export default (actionType, ...actionPayload) => (dispatch, getState) => {
  switch (actionType) {
    case paymentEmiAction.initialize:
      const { paymentDetails, config, paymentUserData } = getState();

      const { txnUuid } = config || {};

      const { lenderDetailsList } = paymentDetails || {};
      const backRoute =
        lenderDetailsList.length > 1 && paymentLenderListRoute.path;

      const { selectedLender } = paymentUserData || {};
      const { lenderId } = selectedLender || {};

      const trackingPayload = {
        txnUUID: txnUuid,
        txnStage: trackingStage.TENURE_SELECTION,
        lenderId: lenderId && lenderId.toString(),
      };

      trackingAction(TRACKING_TRANSACTION, trackingPayload);

      return dispatch({
        type: commonActionType.INIT_QUERY,
        payload: {
          shouldShowHeader: true,
          shouldShowDrawer: false,
          shouldShowTransactionDetails: true,
          backRoute,
        },
      });
    case paymentEmiAction.onEmiSelection:
      const selectedEmiDetails = actionPayload[0];

      return dispatch({
        type: paymentEmiActionType.SELECT_EMI,
        payload: { selectedEmiDetails },
      });
    case paymentEmiAction.closeBenefitModel:
      return dispatch({
        type: paymentEmiActionType.CLOSED_BENEFIT_MODEL,
        payload: {},
      });
    default:
      return console.error(`missing case handle for actionType: ${actionType}`);
  }
};
