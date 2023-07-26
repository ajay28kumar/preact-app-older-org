//@flow

import { TRACKING_TRANSACTION } from '../../actionTypes';

import tracking from './tracking';

export default (action: string, actionPayload?: Object) => {
  switch (action) {
    case TRACKING_TRANSACTION:
      return tracking(actionPayload);
    default:
      return null;
  }
};
