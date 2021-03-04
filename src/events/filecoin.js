import LogRocket from 'logrocket';
import { sdk, apiClient } from '@clients';
import { UPDATE_OBJECT } from '@reducers/storage';
import * as Sentry from '@sentry/react';

import store from '../store';

const EVENT_NAME = 'filecoin';

export const getDealId = async (object) => {
  if (object.dealId && object.proposalCID) return;
  if (!object.ipfsHash || object.ipfsHash === '') return;

  try {
    const users = await sdk.getUsers();
    const spaceUser = users.list()[0];

    const { data } = await apiClient.filecoin.fetchDealStatus({
      token: spaceUser.token,
      hash: object.ipfsHash,
    });

    store.dispatch({
      type: UPDATE_OBJECT,
      payload: {
        bucket: object.bucket,
        fullKey: object.fullKey,
        ...(data.dealId && data.dealId !== 0 && { dealId: data.dealId }),
        ...(data.proposalCid && { proposalCID: data.proposalCid }),
      },
    });
  } catch (error) {
    const errorInfo = {
      tags: { event: EVENT_NAME, method: 'getDealId' },
      extra: { ...object },
    };

    Sentry.captureException(error, errorInfo);
    LogRocket.captureException(error, errorInfo);
    /* eslint-disable-next-line no-console */
    console.error('Error fetching dealID', error);
  }
};

/* eslint-disable no-async-promise-executor */
export const fetchDealId = async (object, updateStore = false) => new Promise(async (resolve) => {
  if (object.dealId && object.proposalCID) {
    resolve({
      dealId: object.dealId,
      proposalCID: object.proposalCID,
    });
  }

  if (!object.ipfsHash || object.ipfsHash === '') {
    resolve({
      dealId: null,
      proposalCID: null,
    });
  }

  try {
    const users = await sdk.getUsers();
    const spaceUser = users.list()[0];

    const { data } = await apiClient.filecoin.fetchDealStatus({
      token: spaceUser.token,
      hash: object.ipfsHash,
    });

    const filecoinInfo = {
      dealId: data.dealId && data.dealId > 0 ? data.dealId : null,
      proposalCID: data.proposalCid,
    };

    if (updateStore) {
      store.dispatch({
        type: UPDATE_OBJECT,
        payload: { bucket: object.bucket, fullKey: object.fullKey, ...filecoinInfo },
      });
    }

    resolve(filecoinInfo);
  } catch (error) {
    const errorInfo = {
      tags: { event: EVENT_NAME, method: 'fetchDealId' },
      extra: { ...object, updateStore },
    };

    Sentry.captureException(error, errorInfo);
    LogRocket.captureException(error, errorInfo);
    /* eslint-disable-next-line no-console */
    console.error('error fetchig dealID', error);
    resolve({ dealId: null, proposalCID: null });
  }
});
