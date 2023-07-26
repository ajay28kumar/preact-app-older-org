import {
  experimentName,
  fetchExperimentData,
} from '../../api/controllers/experimentController';
import Utils, { getLocalstorage } from '../../utils';
import { CLIENT_ID_COOKIE_KEY } from '../../tracking/helper';
import { paymentInitActionType } from '../../actionTypes';

export default () => (dispatch) => {
  const clientId =
    Utils.getCookie(CLIENT_ID_COOKIE_KEY) ||
    getLocalstorage(CLIENT_ID_COOKIE_KEY);
  const data = {
    experimentName: experimentName.TRANSACTION_AIVF_POP_UP_VARIANT,
    uniqueId: clientId,
  };
  fetchExperimentData(data)
    .then(({ data: respData }) => {
      const { value } = respData || {};
      return dispatch({
        type: paymentInitActionType.TRANSACTION_VARIANT_BENEFIT_POPUP_RESPONSE,
        payload: {
          [experimentName.TRANSACTION_AIVF_POP_UP_VARIANT]: value,
        },
      });
    })
    .catch(() => {
      //returning default Experiment as A in case of error
      return dispatch({
        type: paymentInitActionType.TRANSACTION_VARIANT_BENEFIT_POPUP_RESPONSE,
        payload: {
          [experimentName.TRANSACTION_AIVF_POP_UP_VARIANT]: 'A',
        },
      });
    });
};
