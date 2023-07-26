import { checkUserEligibilityController } from '../../api/controllers/loginController';
import { commonActionType, homeActionType } from '../../actionTypes';
import { removeBlankKeys } from '../../components/material-ui/helper';
import { lenderTheme, storeLenderId } from '../../utils/lenderTheme';

export default (
  payload: Object,
  onSuccessAction?: Function,
  onFailAction?: Function,
) => (dispatch: Function) => {
  const { mobile, ignoreCookie, gatewayMerchantId } = payload;
  const data = {
    mobiles: [mobile],
    ignoreCookie,
    gatewayMerchantId,
  };
  dispatch({ type: homeActionType.SUD_API_REQUEST, payload: {} });
  checkUserEligibilityController(data)
    .then(({ data: responseData }) => {
      const { isEligible, lenders, userStatus, mobile } = responseData || {};
      dispatch({
        type: homeActionType.SUD_API_SUCCESS,
        payload: removeBlankKeys({ isEligible, userStatus, mobile }),
      });
      if (lenders) {
        const id = lenders[0];
        const lenderId = id.toString();
        storeLenderId(id);
        dispatch({
          type: commonActionType.STORE_DATA,
          payload: {
            lenderDetails: { id: lenderId, ...lenderTheme[lenderId] },
          },
        });
      }
      if (onSuccessAction) dispatch(onSuccessAction(responseData));
    })
    .catch((error) => {
      if (onFailAction) dispatch(onFailAction(error));
    });
};
