import { WIDGET_STORE_META_DATA } from '../../../actionTypes';

const metadata = (state = {}, action) => {
  switch (action.type) {
    case WIDGET_STORE_META_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default metadata;
