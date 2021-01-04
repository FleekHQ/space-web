import { TOAST_ACTION_TYPES } from '@reducers/toast';

export const openToast = (payload) => (dispatch) => dispatch({
  type: TOAST_ACTION_TYPES.OPEN_TOAST,
  payload,
});

export const closeToast = () => (dispatch) => dispatch({
  type: TOAST_ACTION_TYPES.CLOSE_TOAST,
});
