import get from 'lodash/get';
import { ipcRenderer } from 'electron';

import store from '../store';
import { UPDATE_USER } from '../reducers/user';

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
  ipcRenderer.on(DELETE_ACCOUNT_ERROR_EVENT, () => {
    // TODO: do something.
  });

  ipcRenderer.on(DELETE_ACCOUNT_SUCCESS_EVENT, () => {
    // TODO: do something.
  });

  /* eslint-disable no-console */
  ipcRenderer.on(UPDATE_IDENTITY_ERROR_EVENT, (event, payload) => {
    console.log('UPDATE_IDENTITY_ERROR_EVENT', payload);
  });

  ipcRenderer.on(UPDATE_IDENTITY_SUCCESS_EVENT, (event, payload) => {
    const user = get(payload, 'data', {}) || {};

    store.dispatch({
      user,
      type: UPDATE_USER,
    });
  });

  ipcRenderer.on(UPLOAD_PROFILE_PIC_ERROR_EVENT, (event, payload) => {
    console.log('UPLOAD_PROFILE_PIC_ERROR_EVENT', payload);
  });

  ipcRenderer.on(UPLOAD_PROFILE_PIC_SUCCESS_EVENT, (event, payload) => {
    const user = get(payload, 'data', {}) || {};

    store.dispatch({
      user,
      type: UPDATE_USER,
    });
  });
};

export const deleteAccount = () => {
  ipcRenderer.send(DELETE_ACCOUNT_EVENT);
};

export const uploadProfilePic = (payload) => {
  ipcRenderer.send(UPLOAD_PROFILE_PIC_EVENT, payload);
};

export const updateIdentity = (payload) => ipcRenderer.send(UPDATE_IDENTITY_EVENT, payload);

export default registerAccountEvents;
