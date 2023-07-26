import { removeBlankKeys } from '../../components/material-ui/helper';
import { fetchEMIInfo } from '../../api/controllers/widgetControllers';
import { widgetEMIInfoActionType } from '../../actionTypes';

export default (payload) => (dispatch) => {
  const { mobile, amount } = payload || {};
  const data = removeBlankKeys({ mobile, amount });
  dispatch({
    type: widgetEMIInfoActionType.WIDGET_EMI_INFO_REQUEST,
    payload: {},
  });
  fetchEMIInfo(data)
    .then(({ data: respData }) => {
      dispatch({
        type: widgetEMIInfoActionType.WIDGET_EMI_INFO_SUCCESS,
        payload: respData.data,
      });
    })
    .catch(({ data: error }) => {
      const { errorCode, message } = error || {};
      //TODO: use error-code
      dispatch({
        type: widgetEMIInfoActionType.WIDGET_EMI_INFO_FAILURE,
        payload: { errorMessage: message },
      });
    });
};
