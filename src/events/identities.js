import { ipcRenderer } from 'electron';

import { IDENTITIES_ACTION_TYPES } from '@reducers/identities';
import store from '../store';

const EVENT_PREFIX = 'identities';
const GET_IDENTITIES_BY_ADDRESS_EVENT = `${EVENT_PREFIX}:byAddress`;
const GET_IDENTITIES_BY_ADDRESS_ERROR_EVENT = `${EVENT_PREFIX}:byAddress:error`;
const GET_IDENTITIES_BY_ADDRESS_SUCCESS_EVENT = `${EVENT_PREFIX}:byAddress:success`;
const GET_RECENTLY_MEMBERS_EVENT = `${EVENT_PREFIX}:recentlyMembers`;
const GET_RECENTLY_MEMBERS_ERROR_EVENT = `${EVENT_PREFIX}:recentlyMembers:error`;
const GET_RECENTLY_MEMBERS_SUCCESS_EVENT = `${EVENT_PREFIX}:recentlyMembers:success`;

const registerIdentitiesEvents = () => {
  ipcRenderer.on(GET_IDENTITIES_BY_ADDRESS_ERROR_EVENT, (_, error) => {
    // eslint-disable-next-line no-console
    console.error('Error when trying to get the identities by address: ', error.message);
  });

  ipcRenderer.on(GET_IDENTITIES_BY_ADDRESS_SUCCESS_EVENT, (_, data) => {
    store.dispatch({
      identities: data.identities,
      type: IDENTITIES_ACTION_TYPES.ON_GET_IDENTITIES_SUCCESS,
    });
  });

  ipcRenderer.on(GET_RECENTLY_MEMBERS_SUCCESS_EVENT, (_, payload) => {
    store.dispatch({
      identities: payload.identities,
      type: IDENTITIES_ACTION_TYPES.ON_GET_IDENTITIES_SUCCESS,
    });
  });

  ipcRenderer.on(GET_RECENTLY_MEMBERS_ERROR_EVENT, (_, error) => {
    // eslint-disable-next-line no-console
    console.error('Error when trying to get recently members: ', error.message);
  });
};

/**
 * Get identities by address event
 * @param {Object} payload
 * @param {Array.<string>} payload.addresses - list of addresses to request
 */
export const getIdentitiesByAddress = (payload) => {
  ipcRenderer.send(GET_IDENTITIES_BY_ADDRESS_EVENT, payload);
};

export const fetchRecentlyMembers = () => {
  ipcRenderer.send(GET_RECENTLY_MEMBERS_EVENT);
};

export default registerIdentitiesEvents;
