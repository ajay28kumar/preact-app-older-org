import actionType from './actionType';
import getUserEligibility from '../checkUserEligibility';

export default (action: string, actionPayload?: Object) => (
  dispatch: Function,
) => {
  switch (action) {
    case actionType.checkUserEligible:
      const { mobile, ignoreCookie, gatewayMerchantId } = actionPayload || {};
      return dispatch(
        getUserEligibility({ mobile, ignoreCookie, gatewayMerchantId }),
      );
    default:
      return null;
  }
};
