import { ipcRenderer } from 'electron';

import { SIGNUP_ACTION_TYPES } from '@reducers/auth/signup';
import { SIGNOUT_ACTION_TYPES } from '@reducers/auth/signout';
import { MNEMONIC_ACTION_TYPES } from '@reducers/mnemonic';
import { CHANGE_PASSWORD_ACTION_TYPES } from '@reducers/change-password';

import store from '../store';

const EVENT_PREFIX = 'keys';
const GET_PUBLIC_KEY_EVENT = `${EVENT_PREFIX}:publicKey`;
const GET_PUBLIC_KEY_ERROR_EVENT = `${EVENT_PREFIX}:publicKey:error`;
const GET_PUBLIC_KEY_SUCCESS_EVENT = `${EVENT_PREFIX}:publicKey:success`;
const DELETE_KEY_PAIR = `${EVENT_PREFIX}:delete`;
const DELETE_KEY_PAIR_SUCCESS = `${EVENT_PREFIX}:delete:success`;
const DELETE_KEY_PAIR_ERROR = `${EVENT_PREFIX}:delete:error`;
const GET_MNEMONIC_SEED_EVENT = `${EVENT_PREFIX}:get_mnemomnic`;
const GET_MNEMONIC_SEED_ERROR_EVENT = `${EVENT_PREFIX}:get_mnemomnic:error`;
const GET_MNEMONIC_SEED_SUCCESS_EVENT = `${EVENT_PREFIX}:get_mnemomnic:success`;
const BACKUP_KEYS_BY_PASSPHRASE_SEED_EVENT = `${EVENT_PREFIX}:backupByPassphrase`;
const BACKUP_KEYS_BY_PASSPHRASE_SEED_ERROR_EVENT = `${EVENT_PREFIX}:backupByPassphrase:error`;
const BACKUP_KEYS_BY_PASSPHRASE_SEED_SUCCESS_EVENT = `${EVENT_PREFIX}:backupByPassphrase:success`;
const TEST_KEYS_BY_PASSPHRASE_EVENT = `${EVENT_PREFIX}:testKeys`;
const TEST_KEYS_BY_PASSPHRASE_ERROR_EVENT = `${EVENT_PREFIX}:testKeys:error`;
const TEST_KEYS_BY_PASSPHRASE_SUCCESS_EVENT = `${EVENT_PREFIX}:testKeys:success`;

/* eslint-disable no-console */
const registerKeysEvents = () => {
  ipcRenderer.on(GET_PUBLIC_KEY_ERROR_EVENT, (_, error) => {
    console.error('Error when trying to get the publick key: ', error.message);

    store.dispatch({
      error: error.message,
      type: SIGNUP_ACTION_TYPES.ON_GET_PUBLIC_KEY_ERROR,
    });
  });

  ipcRenderer.on(GET_PUBLIC_KEY_SUCCESS_EVENT, (_, data) => {
    store.dispatch({
      type: SIGNUP_ACTION_TYPES.ON_GET_PUBLIC_KEY_SUCCESS,
      publicKey: data.publicKey,
    });
  });

  ipcRenderer.on(DELETE_KEY_PAIR_SUCCESS, () => {
    console.log('key pair deleted');
  });

  ipcRenderer.on(DELETE_KEY_PAIR_ERROR, () => {
    console.log('error delete key pair');
  });

  ipcRenderer.on(GET_MNEMONIC_SEED_ERROR_EVENT, (_, error) => {
    console.error('Error when trying to get the mnemonic seed: ', error.message);

    store.dispatch({
      error: error.message,
      type: MNEMONIC_ACTION_TYPES.ON_GET_MNEMONIC_ERROR,
    });
  });

  ipcRenderer.on(GET_MNEMONIC_SEED_SUCCESS_EVENT, (_, data) => {
    store.dispatch({
      mnemonic: data.mnemonic,
      type: MNEMONIC_ACTION_TYPES.ON_GET_MNEMONIC_SUCCESS,
    });
  });

  ipcRenderer.on(BACKUP_KEYS_BY_PASSPHRASE_SEED_ERROR_EVENT, (_, error) => {
    console.error('Error when trying to backup keys by passphrase: ', error.message);

    store.dispatch({
      error: error.message,
      type: CHANGE_PASSWORD_ACTION_TYPES.ON_REQUEST_ERROR,
    });
  });

  ipcRenderer.on(BACKUP_KEYS_BY_PASSPHRASE_SEED_SUCCESS_EVENT, () => {
    store.dispatch({
      type: CHANGE_PASSWORD_ACTION_TYPES.ON_REQUEST_SUCCESS,
    });
  });

  ipcRenderer.on(TEST_KEYS_BY_PASSPHRASE_ERROR_EVENT, (_, error) => {
    console.error('Error when trying to test keys by passphrase: ', error.message);

    store.dispatch({
      error: error.message,
      type: SIGNOUT_ACTION_TYPES.ON_SIGNOUT_ERROR,
    });
  });

  ipcRenderer.on(TEST_KEYS_BY_PASSPHRASE_SUCCESS_EVENT, () => {
    store.dispatch({
      type: SIGNOUT_ACTION_TYPES.ON_SIGNOUT_SUCCESS,
    });
  });
};

export const getPublicKey = () => {
  ipcRenderer.send(GET_PUBLIC_KEY_EVENT);
};

export const getMnemonic = () => {
  ipcRenderer.send(GET_MNEMONIC_SEED_EVENT);
};

export const deleteKeyPair = () => ipcRenderer.send(DELETE_KEY_PAIR);

/**
 * @param {Object} payload
 * @param {string} payload.uuid
 * @param {string} payload.passphrase
 */
export const backupKeysByPassphrase = (payload) => {
  store.dispatch({
    type: CHANGE_PASSWORD_ACTION_TYPES.ON_REQUEST,
  });
  ipcRenderer.send(BACKUP_KEYS_BY_PASSPHRASE_SEED_EVENT, payload);
};

/**
 * @param {Object} payload
 * @param {string} payload.uuid
 * @param {string} payload.passphrase
 */
export const testKeys = (payload) => {
  store.dispatch({
    type: SIGNOUT_ACTION_TYPES.ON_SIGNOUT,
  });
  ipcRenderer.send(TEST_KEYS_BY_PASSPHRASE_EVENT, payload);
};

export default registerKeysEvents;
