// Uncomment once payload parameter is ussed
/* eslint-disable no-unused-vars */
import { SIGNUP_ACTION_TYPES } from '@reducers/auth/signup';
import { SIGNOUT_ACTION_TYPES } from '@reducers/auth/signout';
import { MNEMONIC_ACTION_TYPES } from '@reducers/mnemonic';
import { CHANGE_PASSWORD_ACTION_TYPES } from '@reducers/change-password';

import store from '../store';

/* eslint-disable no-console */
const registerKeysEvents = () => {
};

export const getPublicKey = () => {
};

export const getMnemonic = () => {
};

export const deleteKeyPair = () => {
};

/**
 * @param {Object} payload
 * @param {string} payload.uuid
 * @param {string} payload.passphrase
 * @param {string} payload.currentPassphrase
 */
export const backupKeysByPassphrase = (payload) => {
  store.dispatch({
    type: CHANGE_PASSWORD_ACTION_TYPES.ON_REQUEST,
  });
};

/**
 * @param {Object} payload
 * @param {string} payload.uuid
 * @param {string} payload.passphrase
 */
export const testKeysAndDelete = (payload = {}) => {
  store.dispatch({
    type: SIGNOUT_ACTION_TYPES.ON_SIGNOUT,
  });
  setTimeout(() => {
    store.dispatch({
      type: SIGNOUT_ACTION_TYPES.ON_SIGNOUT_SUCCESS,
    });
  }, 1000);
};

export default registerKeysEvents;
