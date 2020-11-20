/* eslint-disable no-unused-vars */
import store from '../store';
import { PRODUCT_KEY_ACTION_TYPES } from '../reducers/settings/product-key';

const registerWalletEvents = () => {
};

export const claimWallet = (payload) => {
  store.dispatch({
    type: PRODUCT_KEY_ACTION_TYPES.CLAIM_WALLET,
  });
};

export default registerWalletEvents;
