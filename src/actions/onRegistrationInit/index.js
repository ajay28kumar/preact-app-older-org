//@flow
import actions from './actionType';
import {
  commonActionType,
  loginActionType,
  registrationInitActionType,
} from '../../actionTypes';
import getCampaignDetails from './getCampaignDetails';
import registrationInitApi from './registrationInitApi';
import postVerifyMobile from './postVerifyMobile';
import verifyMobileSendOTP from './verifyMobileSendOTP';
import getRegistrationUserData from './getRegistrationUserData';
import { removeBlankKeys } from '../../components/material-ui/helper';
import type { ActivationSource } from '../../modelType/activationType';

export default (
  source: ActivationSource,
  actionType: string,
  ...args: Array<any>
) => (dispatch: Function) => {
  switch (actionType) {
    case actions.initialize: {
      const { utmSource, lenderId, utmCampaign } = args[0];
      dispatch({
        type: commonActionType.INIT_QUERY,
        payload: {
          lenderId,
          utmSource,
          utmCampaign,
        },
      });
      dispatch(getRegistrationUserData({ lenderId }));

      return dispatch(getCampaignDetails({ lenderId }));
    }

    case actions.initiateRegistration: {
      const { mobile, shopLater, otpInitiate, campaignId } = args[0] || {};
      return dispatch(
        registrationInitApi({
          source,
          mobile,
          shopLater,
          otpInitiate,
          campaignId,
        }),
      );
    }

    case actions.dispatchActivationErrorMessage:
      const { message } = args[0] || {};
      return dispatch({
        type: registrationInitActionType.UPDATE_ERROR_MESSAGE,
        payload: { errorMessage: message },
      });
    case actions.verifyMobileNumber: {
      //verifyMobile is confirm-registration (user has not registered)
      const { otp, mobile, lenderId } = args[0];
      return dispatch(postVerifyMobile({ source, otp, mobile, lenderId }));
    }
    case actions.partialVerifyMobileSendOTP:
      const {
        actionType: type,
        otpType,
        mobile,
        userIdentifier,
        lenderId,
      } = args[0];
      dispatch({
        type: loginActionType.UPDATE_MOBILE_NUMBER,
        payload: removeBlankKeys({
          mobile,
          lenderId,
        }),
      });
      return dispatch(
        verifyMobileSendOTP({
          type,
          otpType,
          mobile,
          userIdentifier,
          lenderId,
        }),
      );

    default:
      return null;
  }
};
