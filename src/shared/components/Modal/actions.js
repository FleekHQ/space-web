import { v4 as uuidv4 } from 'uuid';

/* Action Types */
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

/* Modal Ids */
export const UPLOAD_PROGRESS_TOAST = 'UPLOAD_PROGRESS_TOAST';
export const SHARE_PROGRESS_TOAST = 'SHARE_PROGRESS_TOAST';
export const SHARING_MODAL = 'SHARING_MODAL';

/* Action creators */
export const openModal = (modalType, props = {}) => (dispatch) => {
  const modalId = uuidv4();

  dispatch({
    type: OPEN_MODAL,
    payload: {
      id: modalId,
      type: modalType,
      props,
    },
  });

  return modalId;
};

export const closeModal = (modalId) => ({
  type: CLOSE_MODAL,
  payload: modalId,
});
