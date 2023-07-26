import { fetchHowToBuy } from '../../api/controllers/widgetControllers';
import { widgetEMIInfoActionType } from '../../actionTypes';

export default () => (dispatch) => {
  dispatch({
    type: widgetEMIInfoActionType.WIDGET_HOW_TO_BUY_REQUEST,
    payload: {},
  });
  fetchHowToBuy({})
    .then(({ data: responseData }) => {
      dispatch({
        type: widgetEMIInfoActionType.WIDGET_HOW_TO_BUY_SUCCESS,
        payload: { ...responseData },
      });
    })
    .catch(({ data: error }) => {
      const { errorCode, message } = error || {};
      dispatch({
        type: widgetEMIInfoActionType.WIDGET_HOW_TO_BUY_FAILURE,
        payload: { errorCode, errorMessage: message },
      });
    });
};
