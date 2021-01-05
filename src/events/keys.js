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
export const backupKeysByPassphrase = () => {
  store.dispatch({
    type: CHANGE_PASSWORD_ACTION_TYPES.ON_REQUEST,
  });
};

export default registerKeysEvents;
