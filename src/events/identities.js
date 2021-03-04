import { sdk, apiClient } from '@clients';
import * as Sentry from '@sentry/react';

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
    const identitiesArray = Array.isArray(data.data) ? data.data : [data.data];
    const identities = identitiesArray.reduce((filteredIdentities, identity) => {
      if (identity !== null) {
        const undefinedRecentlyShared = payload.recentlyShared === undefined;
        const recentlyShared = undefinedRecentlyShared ? false : payload.recentlyShared;

        filteredIdentities.push({ ...identity, recentlyShared });
      }

      return filteredIdentities;
    }, []);

    store.dispatch({
      identities,
      type: IDENTITIES_ACTION_TYPES.ON_GET_IDENTITIES_SUCCESS,
    });
  } catch (e) {
    Sentry.captureException(e);
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
    const res = await storage.getRecentlySharedWith();

    const addresses = res.members.map((member) => member.address);

    if (addresses.length === 0) {
      return;
    }
    getIdentitiesByAddress({ addresses, recentlyShared: true });
  } catch (error) {
    Sentry.captureException(error);
    /* eslint-disable-next-line no-console */
    console.error('Error when trying to get the identities recently shared with:', error);
  }
};

export default registerIdentitiesEvents;
