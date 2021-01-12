// Uncomment once payload parameter is ussed
/* eslint-disable no-unused-vars */
import get from 'lodash/get';
import { objectPresenter } from '@utils';
import { sdk } from '@clients';
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

const listDirectory = async (path, bucket, fetchSubFolders) => {
  const { storage } = await sdk;

  try {
    const { items: entries } = await storage.listDirectory({
      path,
      bucket,
      recursive: false,
    });

    /* eslint-disable-next-line no-console */
    console.log('entries', entries);

    const objects = entries.map((entry) => objectPresenter({
      bucket,
      path: entry.path,
      name: entry.name,
      isDir: entry.isDir,
      created: '2020-12-30T14:28:21-03:00',
      updated: '2020-12-30T14:28:21-03:00',
      ipfsHash: entry.ipfsHash,
      sizeInBytes: entry.sizeInBytes,
      backupCount: entry.backupCount,
      fileExtension: entry.fileExtension,
      isLocallyAvailable: entry.isLocallyAvailable,
      members: entry.members.map((member) => ({
        address: member.address,
        publicKey: member.publicKey,
      })),
    }));

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

  await listDirectory(path, bucket, fetchSubFolders);
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

export default registerObjectsEvents;
