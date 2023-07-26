//@flow
import actionType from './actionType';
import getOffer from './getOffer';

export default (action: string, actionPayload?: Object) => (
  dispatch: Function,
) => {
  switch (action) {
    case actionType.initializeOfferScreen:
      const { campaignId } = actionPayload || {};
      return dispatch(getOffer({ campaignId }));
    default:
      return null;
  }
};
