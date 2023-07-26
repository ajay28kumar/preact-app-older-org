import PaymentController from '../../api/controllers/paymentController';
import {
  paymentEnterMobileActionType,
  paymentInitActionType,
  errorBlockTransactionDisplay,
} from '../../actionTypes';
import { tracker } from '../../tracking';

import onTransactionErrorBlock from '../onTransactionErrorBlock';

import getTransactionExperimentData from './getTransactionExperimentData';

export default (actionPayload) => (dispatch, getState) => {
  const { pageKey } = getState().config || {};
  const { txnUuid, mobile } = actionPayload || {};
  dispatch({
    type: paymentInitActionType.TRANSACTION_INFO_REQUEST,
    payload: { txnUuid },
  });
  const data = {
    pgTxnInfoUuid: txnUuid,
    mobile,
  };
  return PaymentController.getTransactionInfoController(data)
    .then((res) => {
      const {
        gatewayMerchantId: merchantId,
        mobile: mobileNo,
        isEligible,
        purchaseValue,
        lenderDetailsList,
        selectedLenderDetails,
        userStatus,
        returnUrl,
        remainingTimeSeconds,
        pgData,
        isOfferEligible,
        timeoutErrorModel,
      } = res.data || {};
      dispatch(getTransactionExperimentData());
      dispatch({
        type: paymentInitActionType.TRANSACTION_TIMEOUT_STORE,
        payload: { pgData, returnUrl },
      });
      if (timeoutErrorModel) {
        const {
          cta = '',
          errorType = '',
          helpText = '',
          message = '',
          title = '',
        } = timeoutErrorModel || {};
        dispatch({
          type: errorBlockTransactionDisplay.DISPLAY_HELP_TEXT,
          payload: { helpText, title, message, cta, errorType },
        });
      }

      if (mobileNo) {
        if (!isEligible) {
          //NON-eligible
          setTimeout(() => {
            const message = `${mobileNo} is not eligible with any of our banking partners`;
            dispatch({
              type:
                paymentEnterMobileActionType.UPDATE_TRANSACTION_MOBILE_NUMBER_ERROR,
              payload: {
                mobileNoError: message,
              },
            });

            tracker.trackApplicationError(
              'SuD Not Eligible',
              pageKey || 'Missing pageKey',
            );
          }, 0);
        } else if (selectedLenderDetails) {
          //dispatch mobile-number and transaction details
          //pre-selected lender details
          const { emiDetails, lenderType } = selectedLenderDetails;
          emiDetails['lenderType'] = lenderType;
          dispatch({
            type: paymentInitActionType.TRANSACTION_INFO_PRE_SELECTED_SUCCESS,
            payload: {
              merchantId,
              mobile: mobileNo,
              purchaseValue,
              selectedLender: selectedLenderDetails,
              selectedEmiDetails: emiDetails,
            },
          });
        }
      }
      dispatch({
        type: paymentInitActionType.TRANSACTION_INFO_SUCCESS,
        payload: {
          eligible: isEligible,
          merchantId,
          mobile: mobileNo,
          purchaseValue,
          userStatus,
          lenderDetailsList: lenderDetailsList || [],
          selectedLender: selectedLenderDetails,
          remainingTimeSeconds,
          isFlipkartOfferEligible: isOfferEligible,
        },
      });
    })
    .catch(({ data }) => {
      const { errorData, message, cta, errorType, helpText, title } =
        data || {};
      const { pgData, returnUrl } = errorData || {};

      dispatch({
        type: paymentInitActionType.TRANSACTION_INFO_ERROR,
        payload: { pgData, returnUrl },
      });

      dispatch(
        onTransactionErrorBlock({ cta, errorType, helpText, title, message }),
      );
    });
};
