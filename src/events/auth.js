import { ipcRenderer } from 'electron';

import store from '../store';
import { SIGNUP_ACTION_TYPES } from '../reducers/auth/signup';
import { RESTORE_KEYS_MNEMONIC_ACTION_TYPES } from '../reducers/auth/restoreKeysMnemonic';
import { UPDATE_USER } from '../reducers/user';

const EVENT_PREFIX = 'auth';
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

  ipcRenderer.on(RESTORE_KEYS_MNEMONIC_ERROR_EVENT, (event, payload) => {
    store.dispatch({
      type: RESTORE_KEYS_MNEMONIC_ACTION_TYPES.ON_SUBMIT_ERROR,
      payload: payload.message,
    });
  });

  ipcRenderer.on(RESTORE_KEYS_MNEMONIC_SUCCESS_EVENT, (event, payload) => {
    store.dispatch({
      type: UPDATE_USER,
      user: {
        publicKey: payload.publicKey,
      },
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
