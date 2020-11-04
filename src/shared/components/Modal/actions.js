import { v4 as uuidv4 } from 'uuid';

/* Action Types */
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

/* Modal Ids */
export const UPLOAD_PROGRESS_TOAST = 'UPLOAD_PROGRESS_TOAST';
export const SHARE_PROGRESS_TOAST = 'SHARE_PROGRESS_TOAST';
export const SETTINGS_MODAL = 'SETTINGS_MODAL';
export const SHARING_MODAL = 'SHARING_MODAL';
export const PROMPT_MODAL = 'PROMPT_MODAL';
export const CREATE_FOLDER = 'CREATE_FOLDER';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const SIGNOUT_CONFIRMATION = 'SIGNOUT_CONFIRMATION';
export const ERROR_MODAL_TOAST = 'ERROR_MODAL_TOAST';
export const LICENSE_REGISTRATION = 'LICENSE_REGISTRATION';
export const FILE_LINK_PASSWORD = 'FILE_LINK_PASSWORD';
export const ADD_BACK_UP_SIGN_IN = 'ADD_BACK_UP_SIGN_IN';
export const CREATE_USERNAME_PASSWORD = 'CREATE_USERNAME_PASSWORD';

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
