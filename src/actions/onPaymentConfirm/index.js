import {
  apiStatus,
  commonActionType,
  modalActionType,
} from '../../actionTypes';
import paymentConfirm from './actionType';
import getTransactionInitSecondFactor from './getTransactionInitSecondFactor';
import postTransactionVerifySecondFactor from './postTransactionVerifySecondFactor';
import postInitiateTransaction from './postInitiateTransaction';
import postConfirmTransaction from './postConfirmTransaction';
import postResendOtp from './postResendOtp';
import postForgotPin from './postForgotPin';
import {
  paymentEmiSelectionRoute,
  payLaterPlanSelectionRoute,
} from '../../alias/paymentRoutes';
import { modalType } from '../onModalAction/actionType';

export default (actionType, ...actionPayload) => (dispatch, getState) => {
  switch (actionType) {
    case paymentConfirm.initialize:
      const { paymentUserData, paymentDetails } = getState();
      const { selectedEmiDetails, selectedLender } = paymentUserData || {};
      const { lenderType } = selectedLender || {};
      const { transactionInfoPreSelectedApiState } = paymentDetails || {};
      const { loanDuration } = selectedEmiDetails;
      const backRoute =
        loanDuration &&
        transactionInfoPreSelectedApiState !== apiStatus.SUCCESS &&
        (lenderType === 'PAY_LATER'
          ? payLaterPlanSelectionRoute.path
          : paymentEmiSelectionRoute.path);
      return dispatch({
        type: commonActionType.INIT_QUERY,
        payload: {
          shouldShowHeader: true,
          shouldShowTransactionDetails: true,
          backRoute,
        },
      });
    case paymentConfirm.initiateSecondFactor:
      return dispatch(getTransactionInitSecondFactor());
    case paymentConfirm.verifySecondFactor:
      const { aivfValue } = actionPayload[0];
      return dispatch(postTransactionVerifySecondFactor({ aivfValue }));
    case paymentConfirm.initiateTransaction: {
      const { aivfValue } = actionPayload[0];
      return dispatch(postInitiateTransaction(aivfValue));
    }
    case paymentConfirm.confirmTransaction:
      const { otp, isLenderTxnAndICRegistrationTnCAccepted } = actionPayload[0];
      return dispatch(
        postConfirmTransaction({
          otp,
          isLenderTxnAndICRegistrationTnCAccepted,
        }),
      );
    case paymentConfirm.resendOtp:
      return dispatch(postResendOtp());
    case paymentConfirm.forgotPin:
      return dispatch(postForgotPin());
    case paymentConfirm.openAivfTransactionInfoModal:
      return dispatch({
        type: modalActionType.SHOW_MODAL,
        payload: { modalType: modalType.aivfTransactionInfoModal, payload: {} },
      });
    default:
      return console.error(
        `missing case handle for actionType : ${actionType}`,
      );
  }
};
