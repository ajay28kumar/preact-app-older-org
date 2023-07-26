import { widgetCheckEligibleActionType } from '../../actionTypes';
import { sendSMSLinkController } from '../../api/controllers/ntbController';

export default ({ contactNumber }) => (dispatch) => {
  dispatch({
    type: widgetCheckEligibleActionType.WIDGET_NTB_SMS_INITIATE,
    payload: {},
  });
  sendSMSLinkController({ mobile: contactNumber })
    .then(({ data: responseData }) => {
      dispatch({
        type: widgetCheckEligibleActionType.WIDGET_NTB_SMS_SUCCESS,
        payload: {},
      });
    })
    .catch(({ data: errorData }) => {
      dispatch({
        type: widgetCheckEligibleActionType.WIDGET_NTB_SMS_ERROR,
        payload: {},
      });
    });
};
