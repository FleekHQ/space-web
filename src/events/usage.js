import { ipcRenderer } from 'electron';
import { USAGE_SETTINGS_ACTION_TYPES } from '@reducers/settings/usage';

import store from '../store';

const EVENT_PREFIX = 'usage';
const FETCH_USAGE_EVENT = `${EVENT_PREFIX}:fetch`;
const FETCH_USAGE_ERROR_EVENT = `${EVENT_PREFIX}:fetch:error`;
const FETCH_USAGE_SUCCESS_EVENT = `${EVENT_PREFIX}:fetch:success`;

const registerUsageEvents = () => {
  // eslint-disable-next-line no-unused-vars
  ipcRenderer.on(FETCH_USAGE_SUCCESS_EVENT, (event, payload) => {
    const data = {
      localUsage: {
        storage: payload.localStorageUsed,
        bandwidth: payload.localBandwidthUsed,
        combinedUsage: payload.localStorageUsed + payload.localBandwidthUsed,
      },
      backupUsage: {
        storage: payload.spaceStorageUsed,
        bandwidth: payload.spaceBandwidthUsed,
        combinedUsage: payload.spaceStorageUsed + payload.spaceBandwidthUsed,
        limit: payload.usageQuota,
      },
    };

    store.dispatch({
      payload: data,
      type: USAGE_SETTINGS_ACTION_TYPES.FETCH_USAGE_INFO_SUCCESS,
    });
  });

  ipcRenderer.on(FETCH_USAGE_ERROR_EVENT, (event, payload) => {
    store.dispatch({
      payload,
      type: USAGE_SETTINGS_ACTION_TYPES.FETCH_USAGE_INFO_ERROR,
    });
  });
};

export const fetchUsageData = () => {
  store.dispatch({
    type: USAGE_SETTINGS_ACTION_TYPES.FETCH_USAGE_INFO,
  });

  ipcRenderer.send(FETCH_USAGE_EVENT);
};

export default registerUsageEvents;
