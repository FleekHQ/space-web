import { IDENTITIES_ACTION_TYPES } from '@reducers/identities';
import { sdk, apiClient } from '@clients';
import store from '../store';

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
    /* eslint-disable-next-line no-console */
    console.error('Error when trying to get the identities by address:', e);
  }
};

export const fetchRecentlyMembers = async () => {
  store.dispatch({
    type: IDENTITIES_ACTION_TYPES.ON_GET_IDENTITIES,
  });

  try {
    const storage = await sdk.getStorage();
    const res = await storage.getFilesRecentlySharedWith();
    const memberAddresses = res.members.map((member) => member.address);

    getIdentitiesByAddress(memberAddresses);
  } catch (error) {
    store.dispatch({
      type: IDENTITIES_ACTION_TYPES.ON_GET_IDENTITIES_ERROR,
      error,
    });
  }
};
