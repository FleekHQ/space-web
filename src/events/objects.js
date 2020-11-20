/* eslint-disable no-unused-vars */
import {
  SET_LOADING_STATE_BUCKET,
  SET_LOADING_STATE,
} from '@reducers/storage';
import { SEARCH_ACTION_TYPES } from '@reducers/search';
import { OPEN_PUBLIC_FILE_ACTION_TYPES } from '@reducers/open-public-file';

import store from '../store';

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
};

export const openObject = ({
  path,
  dbId,
  name,
  ipfsHash,
  isPublicLink = false,
  bucket = 'personal',
}) => {
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

export default registerObjectsEvents;
