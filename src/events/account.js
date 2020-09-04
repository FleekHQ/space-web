import get from 'lodash/get';
import { ipcRenderer } from 'electron';

import store from '../store';
import { USER_ACTION_TYPES } from '../reducers/user';
import { DELETE_ACCOUNT_ACTION_TYPES } from '../reducers/delete-account';

const EVENT_PREFIX = 'account';
const DELETE_ACCOUNT_EVENT = `${EVENT_PREFIX}:delete`;
const DELETE_ACCOUNT_ERROR_EVENT = `${EVENT_PREFIX}:delete:error`;
const DELETE_ACCOUNT_SUCCESS_EVENT = `${EVENT_PREFIX}:delete:success`;
const UPDATE_IDENTITY_EVENT = `${EVENT_PREFIX}:identity:update`;
const UPDATE_IDENTITY_ERROR_EVENT = `${UPDATE_IDENTITY_EVENT}:error`;
const UPDATE_IDENTITY_SUCCESS_EVENT = `${UPDATE_IDENTITY_EVENT}:success`;
const UPLOAD_PROFILE_PIC_EVENT = `${EVENT_PREFIX}:identity:uploadProfilePic`;
const UPLOAD_PROFILE_PIC_ERROR_EVENT = `${UPLOAD_PROFILE_PIC_EVENT}:error`;
const UPLOAD_PROFILE_PIC_SUCCESS_EVENT = `${UPLOAD_PROFILE_PIC_EVENT}:success`;

const registerAccountEvents = () => {
  ipcRenderer.on(DELETE_ACCOUNT_ERROR_EVENT, (_, error) => {
    // eslint-disable-next-line no-console
    console.error('Error when trying to delete the account', error.message);

    store.dispatch({
      error: error.message,
      type: DELETE_ACCOUNT_ACTION_TYPES.ON_DELETE_ACCOUNT_ERROR,
    });
  });

  ipcRenderer.on(DELETE_ACCOUNT_SUCCESS_EVENT, () => {
    store.dispatch({
      type: DELETE_ACCOUNT_ACTION_TYPES.ON_DELETE_ACCOUNT_SUCCESS,
    });
  });

  /* eslint-disable no-console */
  ipcRenderer.on(UPDATE_IDENTITY_ERROR_EVENT, (event, error) => {
    store.dispatch({
      payload: error.message,
      type: USER_ACTION_TYPES.FETCHING_IDENTITY_ERROR,
    });
  });

  ipcRenderer.on(UPDATE_IDENTITY_SUCCESS_EVENT, (event, payload) => {
    const user = get(payload, 'data', {}) || {};

    store.dispatch({
      user,
      type: USER_ACTION_TYPES.UPDATE_USER,
    });
  });

  ipcRenderer.on(UPLOAD_PROFILE_PIC_ERROR_EVENT, (event, error) => {
    console.error('Error when updating avatar', error);

    store.dispatch({
      error: error.message,
      type: USER_ACTION_TYPES.ON_UPDATE_AVATAR_ERROR,
    });
  });

  ipcRenderer.on(UPLOAD_PROFILE_PIC_SUCCESS_EVENT, (event, payload) => {
    const user = get(payload, 'data', {}) || {};

    store.dispatch({
      user,
      type: USER_ACTION_TYPES.ON_UPDATE_AVATAR_SUCCESS,
    });
  });
};

export const deleteAccount = () => {
  ipcRenderer.send(DELETE_ACCOUNT_EVENT);
};

export const uploadProfilePic = (payload) => {
  store.dispatch({
    type: USER_ACTION_TYPES.ON_UPDATE_AVATAR,
  });

  ipcRenderer.send(UPLOAD_PROFILE_PIC_EVENT, payload);
};

export const updateIdentity = (payload) => ipcRenderer.send(UPDATE_IDENTITY_EVENT, payload);

export default registerAccountEvents;
