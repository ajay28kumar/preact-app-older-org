import actionType from './actionType';
import {
  WIDGET_STORE_HEADER,
  WIDGET_STORE_MERCHANT_DATA,
  WIDGET_STORE_META_DATA,
} from '../../actionTypes';

export default (action, actionPayload) => (dispatch) => {
  switch (action) {
    case actionType.storeHeader:
      const { headers, merchantData } = actionPayload || {};
      if (merchantData) {
        dispatch({
          type: WIDGET_STORE_MERCHANT_DATA,
          payload: merchantData,
        });
      }
      return dispatch({
        type: WIDGET_STORE_HEADER,
        payload: headers,
      });
    case actionType.storeMetaData:
      const { metadata } = actionPayload || {};
      return dispatch({
        type: WIDGET_STORE_META_DATA,
        payload: metadata,
      });
    default:
      return null;
  }
};
