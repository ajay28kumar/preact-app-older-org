import { getHowToBuyController } from '../../api/controllers/buyWithInstacredController';
import { howToBuyActionType } from '../../actionTypes';

export default (payload) => (dispatch) => {
  const { campaignId, lenderId, handle } = payload || {};
  const data = {
    campaignId,
    merchantHandle: handle,
    lenderId,
  };
  dispatch({
    type: howToBuyActionType.GET_HOW_TO_BUY_REQUEST,
    payload: { handle },
  });
  return getHowToBuyController(data)
    .then((resp) => {
      const { branchLocator, howToBuy, merchantMetadata } = resp.data || {};
      const { merchantLogo, title, desktopImgUrl, actionUrl, footerText } =
        howToBuy || {};
      const { id, name } = merchantMetadata || {};
      const data = {
        handle,
        merchantLogo,
        howToBuyTitle: title,
        howToBuyImage: desktopImgUrl,
        merchantUrl: actionUrl,
        footerText,
        merchantId: id,
        merchantName: name,
        imgAltText: `Steps to buy on ${name} on EMI using Instacred Cardless EMI`,
        branchLocator,
        voucherMerchant: id === '11' || id === '12',
      };
      dispatch({
        type: howToBuyActionType.GET_HOW_TO_BUY_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: howToBuyActionType.GET_HOW_TO_BUY_ERROR,
        payload: { handle, error },
      });
    });
};
