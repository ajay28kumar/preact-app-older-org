// @flow

import { trackingTxn } from '../../api/controllers/commonController';

export default (payload: Object) => {
  trackingTxn(payload)
    .then(() => {})
    .catch(() => {});
};
