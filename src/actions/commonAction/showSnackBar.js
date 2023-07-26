import { SHOW_SNACKBAR } from '../../actionTypes';

export default ({ message, type = 'success', callBackAction }) => (
  dispatch,
) => {
  return dispatch({
    type: SHOW_SNACKBAR,
    payload: {
      message,
      type,
      callBackAction,
    },
  });
};
