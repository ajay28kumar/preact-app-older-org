import actions from './actionType';
import { commonActionType, loginActionType } from '../../actionTypes';
import { removeBlankKeys } from '../../components/material-ui/helper';
import getUserEligiblity from '../checkUserEligibility';
import { lenderTheme } from '../../utils/lenderTheme';
import initiateLogin from './initiateLogin';
import { isMobileFormatValid } from '../../utils/mobileNumberValidation';
import { initiateAuth } from './initiateAuth';

export default (actionType, ...actionPayload) => (dispatch) => {
  switch (actionType) {
    case actions.initiateLogin:
      const { mobileNo, gatewayMerchantId } = actionPayload[0] || {};
      if (!isMobileFormatValid(mobileNo)) {
        return dispatch({
          type: loginActionType.INITIATE_LOGIN_ERROR,
          payload: {
            errorMessage: 'Mobile Number is Invalid',
          },
        });
      }
      return dispatch(initiateLogin({ mobile: mobileNo, gatewayMerchantId }));
    case actions.resetErrorMessage:
      return dispatch({
        type: loginActionType.RESET_ERROR_MESSAGE,
        payload: {},
      });
    case actions.initiateAuth: {
      const { mobile, authValue, gatewayMerchantId } = actionPayload[0] || {};
      return dispatch(initiateAuth({ mobile, authValue, gatewayMerchantId }));
    }
    case actions.updateMobileNumber:
      const { mobile, lenderId: id } = actionPayload[0] || {};
      const lenderId = id.toString();
      dispatch({
        type: commonActionType.STORE_DATA,
        payload: {
          lenderDetails: {
            id: lenderId,
            ...lenderTheme[lenderId],
          },
        },
      });
      return dispatch({
        type: loginActionType.UPDATE_MOBILE_NUMBER,
        payload: removeBlankKeys({
          mobile,
          lenderId,
        }),
      });
    case actions.checkUserEligible: {
      const { mobile, ignoreCookie, gatewayMerchantId } =
        actionPayload[0] || {};
      return dispatch(
        getUserEligiblity({ mobile, ignoreCookie, gatewayMerchantId }),
      );
    }
    default:
      return null;
  }
};
