import get from 'lodash/get';
import { ipcRenderer } from 'electron';
import { bucketPresenter } from '@utils';
import {
  STORE_BUCKETS,
  SET_ERROR_STATE,
  SET_LOADING_STATE,
} from '@reducers/storage';

import store from '../store';

const EVENT_PREFIX = 'buckets-list';
const FETCH_EVENT = `${EVENT_PREFIX}:fetch`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUCCESS_EVENT = `${EVENT_PREFIX}:success`;

const registerBucketsEvents = () => {
  ipcRenderer.on(SUCCESS_EVENT, (event, payload) => {
    const bucketsList = get(payload, 'bucketsList', []) || [];
    const buckets = bucketsList.map((obj) => bucketPresenter(obj));

    store.dispatch({
      payload: buckets,
      type: STORE_BUCKETS,
    });
  });

  ipcRenderer.on(ERROR_EVENT, (event, payload) => {
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

  ipcRenderer.send(FETCH_EVENT);
};

export default registerBucketsEvents;
