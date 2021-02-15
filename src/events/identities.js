import { apiClient } from '@clients';
import { IDENTITIES_ACTION_TYPES } from '@reducers/identities';

import store from '../store';

const registerIdentitiesEvents = () => {
};

/**
 * Get identities by address event
 * @param {Object} payload
 * @param {Array.<string>} payload.addresses - list of addresses to request
 */
export const getIdentitiesByAddress = async (payload) => {
  try {
    const { data } = await apiClient.identities.getByAddress({
      token: '',
      addresses: payload.addresses,
    });
    const identities = Array.isArray(data.data) ? data.data : [data.data];
    store.dispatch({
      identities,
      type: IDENTITIES_ACTION_TYPES.ON_GET_IDENTITIES_SUCCESS,
    });
  } catch (e) {
    console.error('Error when trying to get the identities by address:', e);
  }
};

export const fetchRecentlyMembers = () => {
};

export default registerIdentitiesEvents;
