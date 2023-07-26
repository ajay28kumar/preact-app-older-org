import { WIDGET_STORE_HEADER } from '../../../actionTypes';

const initialState = {
  'ic-merchant-key': '',
  'ic-origin': '',
};

const widgetHeaders = (state = initialState, action) => {
  switch (action.type) {
    case WIDGET_STORE_HEADER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default widgetHeaders;
