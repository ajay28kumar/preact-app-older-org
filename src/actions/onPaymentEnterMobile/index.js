import { commonActionType, TRACKING_TRANSACTION } from '../../actionTypes';
import paymentEnterMobileAction from './actionType';
import userEligibility from '../commonAction/userEligibility';
import { isMobileFormatValid } from '../../utils/mobileNumberValidation';
import getTransactionInfo from '../onPaymentInit/getTransactionInfo';
import trackingAction from '../trackingAction';
import { trackingStage } from '../../utils/trackingStage';

export default (actionType, ...actionPayload) => (dispatch, getState) => {
  switch (actionType) {
    case paymentEnterMobileAction.initialize:
      const { config } = getState();
      const { txnUuid: txnUUID } = config || {};
      const trackingPayload = {
        txnUUID,
        txnStage: trackingStage.ENTER_MOBILE,
      };

      trackingAction(TRACKING_TRANSACTION, trackingPayload);

      return dispatch({
        type: commonActionType.INIT_QUERY,
        payload: {
          shouldShowHeader: false,
          shouldShowDrawer: false,
          shouldShowTransactionDetails: false,
        },
      });
    case paymentEnterMobileAction.updateMobileNumber:
      const { mobile, txnUuid } = actionPayload[0] || {};

      if (!isMobileFormatValid(mobile)) {
        return dispatch({
          type: paymentEnterMobileAction.mobileInvalid,
          payload: {
            mobileNoError: 'Mobile Number Invalid',
          },
        });
      }
      const payload = {
        txnUuid,
        mobile,
      };
      dispatch(getTransactionInfo(payload));

      return dispatch(userEligibility({ mobile }));
    default:
      return console.error(
        `missing case handle for actionType : ${actionType}`,
      );
  }
};
