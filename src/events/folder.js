/* eslint-disable no-unused-vars */
import store from '../store';
import { CREATE_FOLDER_ACTION_TYPES } from '../reducers/create-folder';

/* eslint-disable no-console */
const registerKeysEvents = () => {
};

/**
 * create folder event
 * @param {Object} payload
 * @param {string} payload.path
 * @param {string} payload.folderName - Name of the folder
 * @param {string=} payload.bucket - Bucket to create the folder. Default is personal
 */
export const createFolder = (payload) => {
  store.dispatch({
    type: CREATE_FOLDER_ACTION_TYPES.ON_SUBMIT,
  });
};

export default registerKeysEvents;
