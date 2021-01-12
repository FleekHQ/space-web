// Uncomment once payload parameter is ussed
/* eslint-disable no-unused-vars */
import get from 'lodash/get';
import { sdk } from '@clients';
import { objectPresenter, typedArrayToUrl } from '@utils';
import {
  STORE_DIR,
  STORE_OBJECTS,
  SET_LOADING_STATE_BUCKET,
  SET_ERROR_BUCKET,
  SET_LOADING_STATE,
  SET_OPEN_ERROR_BUCKET,
  UPDATE_OBJECT,
} from '@reducers/storage';
import { SEARCH_ACTION_TYPES } from '@reducers/search';
import { OPEN_PUBLIC_FILE_ACTION_TYPES } from '@reducers/open-public-file';
import { DELETE_OBJECT_ACTION_TYPES } from '@reducers/delete-object';

import store from '../store';

const ERROR_TIMEOUT = 5000;
// let openErrorTimeout = null;

const registerObjectsEvents = () => {
};

export const fetchSharedObjects = (seek = '', limit = 100) => {
  store.dispatch({
    payload: {
      loading: true,
      bucket: 'shared-with-me',
    },
    type: SET_LOADING_STATE_BUCKET,
  });

  // TODO: remove mock
  setTimeout(() => {
    store.dispatch({
      payload: {
        loading: false,
        bucket: 'shared-with-me',
      },
      type: SET_LOADING_STATE_BUCKET,
    });

    store.dispatch({
      type: STORE_DIR,
      payload: [],
    });
  }, 1000);
};

export const fetchObjects = (bucket = 'personal') => {
  store.dispatch({
    payload: true,
    type: SET_LOADING_STATE,
  });
};

export const fetchDir = (path = '', bucket = 'personal', fetchSubFolders = true) => {
  store.dispatch({
    payload: {
      loading: true,
      bucket,
    },
    type: SET_LOADING_STATE_BUCKET,
  });

  // TODO: remove mock
  setTimeout(() => {
    store.dispatch({
      payload: {
        loading: false,
        bucket: 'personal',
      },
      type: SET_LOADING_STATE_BUCKET,
    });

    store.dispatch({
      type: STORE_DIR,
      payload: [],
    });
  }, 1000);
};

export const openObject = ({
  path,
  dbId,
  name,
  fullKey,
  ipfsHash,
  isPublicLink = false,
  bucket = 'personal',
}) => {
  if (isPublicLink) {
    // return;
  }
};

export const openPublicFile = (payload) => {
  store.dispatch({
    type: OPEN_PUBLIC_FILE_ACTION_TYPES.ON_OPEN,
  });
};

export const searchFiles = (searchTerm) => {
  store.dispatch({
    type: SEARCH_ACTION_TYPES.SET_SEARCHTERM,
    payload: searchTerm,
  });

  if (searchTerm === '') {
    store.dispatch({
      type: SEARCH_ACTION_TYPES.SET_RESULTS,
      payload: null,
    });
  }
};

export const deleteObject = (payload) => {
  store.dispatch({
    type: DELETE_OBJECT_ACTION_TYPES.ON_SUBMIT,
  });
};

/**
 * @param {Object} payload
 * @param {string} payload.bucket
 * @param {string} payload.path
 * @param {string} payload.mimeType
 */
export const getFileUrlFromIterable = async (payload) => {
  const chunks = [];
  const { storage } = await sdk;

  const response = await storage.openFile(payload);

  /* eslint-disable no-restricted-syntax */
  for await (const chunk of response.stream) {
    chunks.push(chunk);
  }

  const bufferLength = chunks.reduce((acc, chunk) => chunk.length + acc, 0);
  const fileArray = new Uint8Array(bufferLength);

  let index = 0;
  chunks.forEach((chunk) => {
    fileArray.set(chunk, index);
    index += chunk.length;
  });

  // TODO: replace payload.mimeType by openFile response.mimeType (need BE integration first)
  return typedArrayToUrl([fileArray.buffer], payload.mimeType);
};

/**
 * @param {Object} payload
 * @param {string} payload.bucket
 * @param {string} payload.path
 * @param {string} payload.mimeType
 */
export const getFileUrl = async (payload) => {
  const { storage } = await sdk;

  const response = await storage.openFile(payload);
  const fileBytes = await response.consumeStream();

  // TODO: replace payload.mimeType by openFile response.mimeType (need BE integration first)
  return typedArrayToUrl([fileBytes.buffer], payload.mimeType);
};

export default registerObjectsEvents;
