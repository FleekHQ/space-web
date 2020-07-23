import get from 'lodash/get';
import { ipcRenderer } from 'electron';
import { bucketPresenter } from '@utils';
import {
  STORE_BUCKETS,
  SET_ERROR_STATE,
  SET_LOADING_STATE,
} from '@reducers/storage';

import store from '../store';

const EVENT_PREFIX = 'bucket';
const LIST_FETCH_EVENT = `${EVENT_PREFIX}:list:fetch`;
const LIST_ERROR_EVENT = `${EVENT_PREFIX}:list:error`;
const LIST_SUCCESS_EVENT = `${EVENT_PREFIX}:list:success`;

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
      type: SET_ERROR_STATE,
    });
  });
};

export const fetchBuckets = () => {
  store.dispatch({
    payload: true,
    type: SET_LOADING_STATE,
  });

  ipcRenderer.send(LIST_FETCH_EVENT);
};

export default registerBucketEvents;
