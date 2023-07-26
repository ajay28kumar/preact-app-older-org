import actionType from './actionType';
import getEmiInfo from './getEmiInfo';
import getHowToBuy from './getHowToBuy';

export default (action, actionPayload) => (dispatch) => {
  switch (action) {
    case actionType.getEmiData:
      return dispatch(getEmiInfo(actionPayload));
    case actionType.getHowToBuyData:
      return dispatch(getHowToBuy(actionPayload));
    default:
      return null;
  }
};
