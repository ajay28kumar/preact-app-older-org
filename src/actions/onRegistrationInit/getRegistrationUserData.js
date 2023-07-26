import { registrationInitActionType } from '../../actionTypes';
import { setLenderTheme } from '../../utils/lenderTheme';
import { lenderTheme } from '../../utils/lenderTheme';

export default ({ lenderId }) => (dispatch) => {
  const lenderDetails = lenderTheme[lenderId];
  const { theme, lenderLogo } = lenderDetails || {};
  setLenderTheme(theme);
  return dispatch({
    type: registrationInitActionType.INITIATE_ACTIVATION_DATA_SUCCESS,
    payload: { lenderLogo, shouldShowHeader: !!lenderLogo },
  });
};
