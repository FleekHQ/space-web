import { UPDATE_OBJECT } from '@reducers/storage';
import store from '../store';

export const getDealId = (object) => {
  if (object.dealId && object.proposalCID) return;

  // TODO: replace setTimeout by client endpoint call
  setTimeout(() => {
    store.dispatch({
      type: UPDATE_OBJECT,
      payload: {
        bucket: object.bucket,
        fullKey: object.fullKey,
        dealId: 123456,
        proposalCID: 'bafyreifcmqw6fu274ishpggr2cucsdn6ystqdnlpgaa2ndcw4x5sd4pzvm',
      },
    });
  }, 5000);
};

export const fetchDealId = (object, updateStore = false) => new Promise((resolve) => {
  if (object.dealId && object.proposalCID) {
    resolve({
      dealId: object.dealId,
      proposalCID: object.proposalCID,
    });
  }

  // TODO: replace setTimeout by client endpoint call
  setTimeout(() => {
    const filecoinInfo = {
      dealId: 123456,
      proposalCID: 'bafyreifcmqw6fu274ishpggr2cucsdn6ystqdnlpgaa2ndcw4x5sd4pzvm',
    };

    resolve(filecoinInfo);

    if (updateStore) {
      store.dispatch({
        type: UPDATE_OBJECT,
        payload: { bucket: object.bucket, fullKey: object.fullKey, ...filecoinInfo },
      });
    }
  }, 5000);
});
