import { modalActionType } from '../../actionTypes';

export const initialState = 'none';

export default function(state = initialState, action) {
  switch (action.type) {
    case modalActionType.SHOW_MODAL:
      return action.payload.modalType || 'not-specified';
    case modalActionType.HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}
