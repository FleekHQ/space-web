// Uncomment once payload parameter is ussed
/* eslint-disable no-unused-vars */
import get from 'lodash/get';
import { bucketPresenter } from '@utils';
import {
  STORE_BUCKETS,
  SET_BUCKETS_LIST_ERROR_STATE,
  SET_BUCKETS_LIST_LOADING_STATE,
} from '@reducers/storage';
import { USAGE_SETTINGS_ACTION_TYPES } from '@reducers/settings/usage';

import store from '../store';

const registerBucketEvents = () => {
};

export const fetchBuckets = () => {
  store.dispatch({
    payload: true,
    type: SET_BUCKETS_LIST_LOADING_STATE,
  });
};

export const toggleBucketBackup = (payload) => {
  store.dispatch({
    payload: payload.backup,
    type: USAGE_SETTINGS_ACTION_TYPES.TOGGLE_BACKUP,
  });
};

export default registerBucketEvents;
