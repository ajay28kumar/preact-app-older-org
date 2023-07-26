import actions from './actionType';
import onInitiateCreditLine from './onInitiateCreditLine';
import verifyCreditLine from './verifyCreditLine';

export default (source, actionType, ...args) => (dispatch) => {
  switch (actionType) {
    case actions.initiateCreditLine:
      return dispatch(onInitiateCreditLine({ source }));
    case actions.verifyCreditLine:
      const { aivfValue } = args[0];
      return dispatch(verifyCreditLine({ source, aivfValue }));
    default:
      return null;
  }
};
