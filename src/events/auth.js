import { ipcRenderer } from 'electron';

import store from '../store';
import { SIGNUP_ACTION_TYPES } from '../reducers/auth/signup';
import { SIGNIN_ACTION_TYPES } from '../reducers/auth/signin';
import { RESTORE_KEYS_MNEMONIC_ACTION_TYPES } from '../reducers/auth/restore-keys-mnemonic';

const EVENT_PREFIX = 'auth';
const SIGNIN_EVENT = `${EVENT_PREFIX}:signin`;
const SIGNIN_ERROR_EVENT = `${EVENT_PREFIX}:signin:error`;
const SIGNIN_SUCCESS_EVENT = `${EVENT_PREFIX}:signin:success`;
const SIGNUP_EVENT = `${EVENT_PREFIX}:signup`;
const SIGNUP_ERROR_EVENT = `${EVENT_PREFIX}:signup:error`;
const SIGNUP_SUCCESS_EVENT = `${EVENT_PREFIX}:signup:success`;
const CHECK_USERNAME_EVENT = `${EVENT_PREFIX}:check_username`;
const CHECK_USERNAME_ERROR_EVENT = `${EVENT_PREFIX}:check_username:error`;
const CHECK_USERNAME_SUCCESS_EVENT = `${EVENT_PREFIX}:check_username:success`;
const RESTORE_KEYS_MNEMONIC_EVENT = `${EVENT_PREFIX}:restore_keys_mnemonic`;
const RESTORE_KEYS_MNEMONIC_ERROR_EVENT = `${EVENT_PREFIX}:restore_keys_mnemonic:error`;
const RESTORE_KEYS_MNEMONIC_SUCCESS_EVENT = `${EVENT_PREFIX}:restore_keys_mnemonic:success`;

const registerAuthEvents = () => {
  /* Signin events */
  ipcRenderer.on(SIGNIN_ERROR_EVENT, (_, error) => {
    // eslint-disable-next-line
    console.error('signin error payload: ', error);

    store.dispatch({
      error: error.message,
      type: SIGNIN_ACTION_TYPES.ON_SUBMIT_ERROR,
    });
  });

  ipcRenderer.on(SIGNIN_SUCCESS_EVENT, (_, data) => {
    store.dispatch({
      user: data,
      type: SIGNIN_ACTION_TYPES.ON_SUBMIT_SUCCESS,
    });
  });
  /* End Signin events */

  /* Signup events */
  ipcRenderer.on(SIGNUP_ERROR_EVENT, (_, error) => {
    // eslint-disable-next-line
    console.error('signup error payload: ', error);

    store.dispatch({
      error: error.message,
      type: SIGNUP_ACTION_TYPES.ON_SUBMIT_ERROR,
    });
  });

  ipcRenderer.on(SIGNUP_SUCCESS_EVENT, (_, data) => {
    store.dispatch({
      type: SIGNUP_ACTION_TYPES.ON_SUBMIT_SUCCESS,
      user: data,
    });
  });
  /* End Signup events */

  ipcRenderer.on(RESTORE_KEYS_MNEMONIC_ERROR_EVENT, (event, payload) => {
    store.dispatch({
      type: RESTORE_KEYS_MNEMONIC_ACTION_TYPES.ON_SUBMIT_ERROR,
      payload: payload.message,
    });
  });

  ipcRenderer.on(RESTORE_KEYS_MNEMONIC_SUCCESS_EVENT, (event, payload) => {
    store.dispatch({
      type: RESTORE_KEYS_MNEMONIC_ACTION_TYPES.ON_SUBMIT_SUCCESS,
      user: payload,
    });
  });

  /* Check username events */
  ipcRenderer.on(CHECK_USERNAME_ERROR_EVENT, (event, payload) => {
    // eslint-disable-next-line
    console.log('check username error payload: ', payload);
  });

  ipcRenderer.on(CHECK_USERNAME_SUCCESS_EVENT, (event, payload) => {
    // eslint-disable-next-line
    console.log('check username success payload: ', payload);
  });
};

/**
 * User signin
 * @param {Object} payload
 * @param {string} payload.username
 * @param {string} payload.password
 */
export const signin = (payload) => {
  store.dispatch({
    type: SIGNIN_ACTION_TYPES.ON_SUBMIT,
  });
  ipcRenderer.send(SIGNIN_EVENT, payload);
};

/**
 * User signup
 * @param {Object} payload
 * @param {string=} payload.address
 * @param {string=} payload.username
 */
export const singup = (payload) => {
  ipcRenderer.send(SIGNUP_EVENT, payload);
};

export const checkUsername = (payload) => {
  ipcRenderer.send(CHECK_USERNAME_EVENT, payload);
};

export const restoreKeyPairViaMnemonic = (payload) => {
  ipcRenderer.send(RESTORE_KEYS_MNEMONIC_EVENT, payload);
};

export default registerAuthEvents;
