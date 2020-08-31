import get from 'lodash/get';
import { ipcRenderer } from 'electron';
import { bucketPresenter } from '@utils';
import {
  STORE_BUCKETS,
  SET_BUCKETS_LIST_ERROR_STATE,
  SET_BUCKETS_LIST_LOADING_STATE,
} from '@reducers/storage';
import { USAGE_SETTINGS_ACTION_TYPES } from '@reducers/settings/usage';

import store from '../store';

const EVENT_PREFIX = 'bucket';
const LIST_FETCH_EVENT = `${EVENT_PREFIX}:list:fetch`;
const LIST_ERROR_EVENT = `${EVENT_PREFIX}:list:error`;
const LIST_SUCCESS_EVENT = `${EVENT_PREFIX}:list:success`;
const TOGGLE_BUCKET_BACKUP_EVENT = `${EVENT_PREFIX}:toggle_backup`;
const TOGGLE_BUCKET_BACKUP_SUCCESS_EVENT = `${EVENT_PREFIX}:toggle_backup:success`;
const TOGGLE_BUCKET_BACKUP_ERROR_EVENT = `${EVENT_PREFIX}:toggle_backup:error`;

const registerBucketEvents = () => {
  ipcRenderer.on(LIST_SUCCESS_EVENT, (event, payload) => {
    const bucketsList = get(payload, 'bucketsList', []) || [];
    const buckets = bucketsList.map((obj) => bucketPresenter(obj));

    store.dispatch({
      payload: buckets,
      type: STORE_BUCKETS,
    });
  });

  ipcRenderer.on(LIST_ERROR_EVENT, (event, payload) => {
    store.dispatch({
      payload,
      type: SET_BUCKETS_LIST_ERROR_STATE,
    });
  });

  ipcRenderer.on(TOGGLE_BUCKET_BACKUP_SUCCESS_EVENT, (event, payload) => {
    store.dispatch({
      payload,
      type: USAGE_SETTINGS_ACTION_TYPES.TOGGLE_BACKUP_SUCCESS,
    });
  });

  ipcRenderer.on(TOGGLE_BUCKET_BACKUP_ERROR_EVENT, (event, error) => {
    store.dispatch({
      payload: error,
      type: USAGE_SETTINGS_ACTION_TYPES.TOGGLE_BACKUP_ERROR,
    });
  });
};

export const fetchBuckets = () => {
  store.dispatch({
    payload: true,
    type: SET_BUCKETS_LIST_LOADING_STATE,
  });

  ipcRenderer.send(LIST_FETCH_EVENT);
};

export const toggleBucketBackup = (payload) => {
  store.dispatch({
    payload: payload.backup,
    type: USAGE_SETTINGS_ACTION_TYPES.TOGGLE_BACKUP,
  });
  ipcRenderer.send(TOGGLE_BUCKET_BACKUP_EVENT, payload);
};

export default registerBucketEvents;
