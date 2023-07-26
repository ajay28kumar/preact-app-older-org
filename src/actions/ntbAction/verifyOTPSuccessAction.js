import { route } from 'preact-router';
import { ntbActionType } from '../../actionTypes';
import { lenderListController } from '../../api/controllers/ntbController';
import { removeBlankKeys } from '../../components/material-ui/helper';
import {
  newUserActivationSuccessPageRoute,
  newUserActivationPreapprovedSuccessPageRoute,
} from '../../alias/homeRoutes';

export const verifyOTPSuccessAction = (responseData) => (dispatch) => {
  const { message, mobile, redirectUrl, isNTBEnabledOnMerchant } =
    responseData || {};
  const data = {
    mobile: mobile,
    redirectUrl: redirectUrl,
  };
  if (message === 'success') {
    dispatch({ type: ntbActionType.LENDER_LIST_REQUEST, payload: {} });
    lenderListController(data)
      .then(({ data: responseData }) => {
        const { eligible, status } = responseData || {};
        dispatch({
          type: ntbActionType.LENDER_LIST_SUCCESS,
          payload: removeBlankKeys({ eligible }),
        });
        dispatch({
          type: ntbActionType.INIT_LENDER_LIST_SCREEN,
          payload: {
            ...responseData,
            mobileNo: mobile,
            redirectUrl: redirectUrl,
            isNTBEnabledOnMerchant,
          },
        });

        return setTimeout(() => {
          if (
            status === 'REGISTERED' ||
            status === 'PRE_APPROVED' ||
            status === 'ACTIVE'
          ) {
            return route(newUserActivationPreapprovedSuccessPageRoute.path);
          } else {
            return route(
              `${
                newUserActivationSuccessPageRoute.path
              }?isNTBEnabledOnMerchant=${isNTBEnabledOnMerchant}`,
            );
          }
        });
      })
      .catch((error) => {
        dispatch({
          type: ntbActionType.LENDER_LIST_FAILURE,
          payload: removeBlankKeys({ message }),
        });
      });
  } else {
    const errorMessage = message;
    dispatch({
      type: ntbActionType.VERIFY_OTP_FAILURE,
      payload: { errorMessage },
    });
  }
};
