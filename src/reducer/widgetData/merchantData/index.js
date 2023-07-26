import { WIDGET_STORE_MERCHANT_DATA } from '../../../actionTypes';

const merchantData = (state = {}, action) => {
  switch (action.type) {
    case WIDGET_STORE_MERCHANT_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default merchantData;
