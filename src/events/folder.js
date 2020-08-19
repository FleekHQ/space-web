import { ipcRenderer } from 'electron';

import store from '../store';
import { SIGNUP_ACTION_TYPES } from '../reducers/auth/signup';

const EVENT_PREFIX = 'folder';
const CREATE_FOLDER_EVENT = `${EVENT_PREFIX}:folder`;
const CREATE_FOLDER_ERROR_EVENT = `${EVENT_PREFIX}:folder:error`;
const CREATE_FOLDER_SUCCESS_EVENT = `${EVENT_PREFIX}:folder:success`;

/* eslint-disable no-console */
const registerKeysEvents = () => {
  ipcRenderer.on(CREATE_FOLDER_ERROR_EVENT, (_, error) => {
    console.error('Error when trying to get the publick key: ', error.message);

    store.dispatch({
      error: error.message,
      type: SIGNUP_ACTION_TYPES.ON_SUBMIT_ERROR,
    });
  });

  ipcRenderer.on(CREATE_FOLDER_SUCCESS_EVENT, (_, data) => {
    store.dispatch({
      type: SIGNUP_ACTION_TYPES.ON_GET_PUBLIC_KEY,
      publicKey: data.publicKey,
      hubAuthToken: data.hubAuthToken,
    });
  });
};

/**
 * create folder event
 * @param {Object} payload
 * @param {string} payload.path
 * @param {string=} payload.bucket - Bucket to create the folder. Default is personal
 */
export const createFolder = (payload) => {
  ipcRenderer.send(CREATE_FOLDER_EVENT, payload);
};

export default registerKeysEvents;
