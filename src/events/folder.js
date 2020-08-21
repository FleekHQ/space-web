import { ipcRenderer } from 'electron';

import store from '../store';
import { CREATE_FOLDER_ACTION_TYPES } from '../reducers/create-folder';

const EVENT_PREFIX = 'folder';
const CREATE_FOLDER_EVENT = `${EVENT_PREFIX}:folder`;
const CREATE_FOLDER_ERROR_EVENT = `${EVENT_PREFIX}:folder:error`;
const CREATE_FOLDER_SUCCESS_EVENT = `${EVENT_PREFIX}:folder:success`;

/* eslint-disable no-console */
const registerKeysEvents = () => {
  ipcRenderer.on(CREATE_FOLDER_ERROR_EVENT, (_, error) => {
    console.error('Error when trying to create a folder: ', error.message);

    store.dispatch({
      error: error.message,
      type: CREATE_FOLDER_ACTION_TYPES.ON_SUBMIT_ERROR,
    });
  });

  ipcRenderer.on(CREATE_FOLDER_SUCCESS_EVENT, () => {
    store.dispatch({
      type: CREATE_FOLDER_ACTION_TYPES.ON_SUBMIT_SUCCESS,
    });
  });
};

/**
 * create folder event
 * @param {Object} payload
 * @param {string} payload.path
 * @param {string} payload.folderName - Name of the folder
 * @param {string=} payload.bucket - Bucket to create the folder. Default is personal
 */
export const createFolder = (payload) => {
  ipcRenderer.send(CREATE_FOLDER_EVENT, payload);
};

export default registerKeysEvents;
