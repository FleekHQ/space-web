// Uncomment once payload parameter is ussed
/* eslint-disable no-unused-vars */
import get from 'lodash/get';
import { sdk } from '@clients';
import {
  objectPresenter, typedArrayToUrl, getFileProgress, downloadFromUrl,
} from '@utils';
import {
  STORE_DIR,
  STORE_OBJECTS,
  SET_LOADING_STATE_BUCKET,
  SET_ERROR_BUCKET,
  SET_LOADING_STATE,
  SET_OPEN_ERROR_BUCKET,
  UPDATE_OBJECT,
} from '@reducers/storage';
import { DOWNLOAD_ACTION_TYPES } from '@reducers/downloads';
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

export const listDirectory = async (path, bucket, fetchSubFolders = true) => {
  const storage = await sdk.getStorage();

  try {
    const { items } = await storage.listDirectory({
      path,
      bucket,
      recursive: false,
    });

    const entries = flatEntries(items);
    const objects = entries.map((entry) => objectPresenter(entry, false));

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

export const fetchSharedObjects = async (seek = '', limit = 100) => {
  store.dispatch({
    payload: {
      loading: true,
      bucket: 'shared-with-me',
    },
    type: SET_LOADING_STATE_BUCKET,
  });

  const storage = await sdk.getStorage();

  Promise.all([storage.getFilesSharedWithMe(), storage.getFilesSharedByMe()])
    .then((values, currentVal = []) => {
      const sharedFiles = values.reduce((response) => {
        const { files = [] } = response;
        const mappedEntries = files.map((file) => ({
          ...file.entry,
          sharedBy: file.sharedBy,
        }));
        const entries = flatEntries(mappedEntries);
        const objects = entries.map((entry) => objectPresenter(entry, true));
        return ([...objects, ...currentVal]);
      });
      store.dispatch({
        type: STORE_DIR,
        payload: {
          bucket: 'shared-with-me',
          objects: sharedFiles,
        },
      });
      store.dispatch({
        payload: {
          loading: false,
          bucket: 'shared-with-me',
        },
        type: SET_LOADING_STATE_BUCKET,
      });
    }).catch((error) => {
      console.error('Failed to get shared files', error);
      store.dispatch({
        payload: { bucket: 'shared-with-me', error },
        type: SET_ERROR_BUCKET,
      });
    });
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

  return typedArrayToUrl([fileBytes], response.mimeType);
};

/**
 * @param {string} uuid
 */
export const openFileByUuid = async (uuid) => {
  const storage = await sdk.getStorage();

  const res = await storage.openFileByUuid({ uuid });
  const entry = objectPresenter(res.entry, false);

  return {
    entry,
    mimeType: res.mimeType,
    getFileUrl: async () => {
      const fileBytes = await res.consumeStream();
      const url = typedArrayToUrl([fileBytes], res.mimeType);
      store.dispatch({
        type: DOWNLOAD_ACTION_TYPES.ADD_COMPLETED_DOWNLOAD,
        payload: {
          uuid: entry.uuid,
          link: url,
          filename: entry.name,
        },
      });
      return url;
    },
  };
};

/**
 * @param {Object} payload
 * @param {string} payload.bucket
 * @param {string} payload.path
 * @param {number} payload.fileSize
 * @param {string} payload.uuid
 * @param {string} payload.filename
 */
export const downloadFile = async (payload) => {
  try {
    const storage = await sdk.getStorage();

    store.dispatch({
      type: DOWNLOAD_ACTION_TYPES.ADD_DOWNLOAD,
      payload: {
        uuid: payload.uuid,
        filename: payload.filename,
      },
    });

    const response = await storage.openFile({
      ...payload,
      progress: (bytes) => {
        store.dispatch({
          type: DOWNLOAD_ACTION_TYPES.UPDATE_DOWNLOAD_PROGRESS,
          payload: {
            uuid: payload.uuid,
            progress: getFileProgress(payload.fileSize, bytes),
          },
        });
      },
    });

    const fileBytes = await response.consumeStream();
    const url = typedArrayToUrl([fileBytes], response.mimeType);

    downloadFromUrl(url, payload.filename);

    store.dispatch({
      type: DOWNLOAD_ACTION_TYPES.UPDATE_DOWNLOAD_LINK,
      payload: {
        uuid: payload.uuid,
        link: url,
      },
    });
  } catch (error) {
    store.dispatch({
      type: DOWNLOAD_ACTION_TYPES.ERROR_DOWNLOAD,
      payload: {
        uuid: payload.uuid,
        error: error.message,
      },
    });
  }
};

/**
 * Make a file public or non public
 * @param {Object} payload
 * @param {string} payload.path
 * @param {string} payload.bucket
 * @param {boolean} payload.allowAccess
 */
export const setFileAccess = async (payload) => {
  try {
    const storage = await sdk.getStorage();
    await storage.setFilePublicAccess({
      path: payload.path,
      bucket: payload.bucket,
      allowAccess: payload.allowAccess,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error when trying to change file access type: ${error.message}`);
  }
};

export default registerObjectsEvents;
