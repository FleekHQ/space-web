import { ipcRenderer } from 'electron';

import store from '../store';
import { PRODUCT_KEY_ACTION_TYPES } from '../reducers/settings/product-key';

const EVENT_PREFIX = 'wallet';
const CLAIM_EVENT = `${EVENT_PREFIX}:claim`;
const CLAIM_ERROR_EVENT = `${EVENT_PREFIX}:claim:error`;
const CLAIM_SUCCESS_EVENT = `${EVENT_PREFIX}:claim:success`;

const registerWalletEvents = () => {
  ipcRenderer.on(CLAIM_ERROR_EVENT, (_, error) => {
    // eslint-disable-next-line no-console
    console.error('Error when trying to claim wallet', error.message);

    store.dispatch({
      error: error.message,
      type: PRODUCT_KEY_ACTION_TYPES.CLAIM_WALLET_ERROR,
    });
  });

  ipcRenderer.on(CLAIM_SUCCESS_EVENT, (_, payload) => {
    store.dispatch({
      planInfo: payload,
      type: PRODUCT_KEY_ACTION_TYPES.CLAIM_WALLET_SUCCESS,
    });
  });
};

export const claimWallet = (payload) => {
  store.dispatch({
    type: PRODUCT_KEY_ACTION_TYPES.CLAIM_WALLET,
  });

  ipcRenderer.send(CLAIM_EVENT, payload);
};

export default registerWalletEvents;
