import commonController from '../../api/controllers/commonController';
import { lenderTheme } from '../../utils/lenderTheme';

export default (actionPayload) => (dispatch, getState) => {
  const { mobile } = actionPayload || {};
  const { paymentDetails, paymentUserData } = getState() || {};
  const { lenderDetails } = paymentUserData;
  const { lenderId } = lenderDetails || {};
  const { bankCode } = lenderTheme[lenderId] || {};
  const { purchaseValue, merchantId } = paymentDetails || {};
  commonController
    .getUserSUD({ mobile, merchantId, amt: purchaseValue, bankCode })
    .then()
    .catch();
};
