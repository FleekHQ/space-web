// Uncomment once payload parameter is ussed
/* eslint-disable no-unused-vars */
import get from 'lodash/get';
import { sdk } from '@clients';
import { objectPresenter, typedArrayToUrl, getEntryMapper } from '@utils';
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

const flatEntries = (entries = []) => entries.reduce((acc, entry) => [
  ...acc,
  ...(entry.isDir ? flatEntries(entry.items) : []),
  entry,
], []);

const listDirectory = async (path, bucket, fetchSubFolders = true) => {
  const storage = await sdk.getStorage();

  try {
    const { items } = await storage.listDirectory({
      path,
      bucket,
      recursive: false,
    });

    const entries = flatEntries(items);
    const objects = entries.map((entry) => objectPresenter(entry, false, getEntryMapper(bucket)));

    store.dispatch({
      payload: {
        bucket,
        loading: false,
      },
      type: SET_LOADING_STATE_BUCKET,
    });

    store.dispatch({
      payload: objects,
      type: STORE_DIR,
    });

    if (fetchSubFolders) {
      const fetchSubDirs = entries
        .filter((entry) => entry.isDir)
        .map((entry) => entry.path.replace(/^\//, ''))
        .map((subDir) => listDirectory(subDir, bucket, false));

      await Promise.all(fetchSubDirs);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    store.dispatch({
      payload: { bucket, error },
      type: SET_ERROR_BUCKET,
    });
  }
};

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

export const fetchDir = async (path = '', bucket = 'personal', fetchSubFolders = true) => {
  store.dispatch({
    payload: {
      bucket,
      loading: true,
    },
    type: SET_LOADING_STATE_BUCKET,
  });

  await listDirectory(path, bucket);
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
 */
export const getFileUrlFromIterable = async (payload) => {
  const chunks = [];
  const storage = await sdk.getStorage();

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

  return typedArrayToUrl([fileArray.buffer], response.mimeType);
};

/**
 * @param {Object} payload
 * @param {string} payload.bucket
 * @param {string} payload.path
 */
export const getFileUrl = async (payload) => {
  const storage = await sdk.getStorage();

  const response = await storage.openFile(payload);
  const fileBytes = await response.consumeStream();

  return typedArrayToUrl([fileBytes.buffer], response.mimeType);
};

/**
 * @param {string} uuid
 */
export const openFileByUuid = async (uuid) => {
  const storage = await sdk.getStorage();

  const res = await storage.openFileByUuid(uuid);

  return {
    entry: objectPresenter(res.entry, false, getEntryMapper('personal')),
    mimeType: res.mimeType,
    getFileUrl: async () => {
      const fileBytes = await res.consumeStream();
      return typedArrayToUrl([fileBytes.buffer], res.mimeType);
    },
  };
};

export default registerObjectsEvents;
