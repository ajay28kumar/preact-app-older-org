import actionType from './actionType';
import getCategory from './getCategory';
import { categoryActionType } from '../../actionTypes';

export default (action, actionPayload) => (dispatch) => {
  switch (action) {
    case actionType.initializeCategory:
      //campaignID needs to be updated as well as lender needs to be fetched here
      const { lenderId, campaignId } = actionPayload;
      return dispatch(getCategory({ lenderId, campaignId }));
    default:
      return null;
  }
};
