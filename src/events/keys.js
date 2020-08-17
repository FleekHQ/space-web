import { ipcRenderer } from 'electron';

import store from '../store';
import { SIGNUP_ACTION_TYPES } from '../reducers/auth/signup';

const EVENT_PREFIX = 'keys';
const GET_PUBLIC_KEY_EVENT = `${EVENT_PREFIX}:publicKey`;
const GET_PUBLIC_KEY_ERROR_EVENT = `${EVENT_PREFIX}:publicKey:error`;
const GET_PUBLIC_KEY_SUCCESS_EVENT = `${EVENT_PREFIX}:publicKey:success`;
const DELETE_KEY_PAIR = `${EVENT_PREFIX}:delete`;
const DELETE_KEY_PAIR_SUCCESS = `${EVENT_PREFIX}:delete:success`;
const DELETE_KEY_PAIR_ERROR = `${EVENT_PREFIX}:delete:error`;

/* eslint-disable no-console */
const registerKeysEvents = () => {
  ipcRenderer.on(GET_PUBLIC_KEY_ERROR_EVENT, (_, error) => {
    console.error('Error when trying to get the publick key: ', error.message);

    store.dispatch({
      error: error.message,
      type: SIGNUP_ACTION_TYPES.ON_SUBMIT_ERROR,
    });
  });

  ipcRenderer.on(GET_PUBLIC_KEY_SUCCESS_EVENT, (_, data) => {
    store.dispatch({
      type: SIGNUP_ACTION_TYPES.ON_GET_PUBLIC_KEY,
      publicKey: data.publicKey,
      hubAuthToken: data.hubAuthToken,
    });
  });

  ipcRenderer.on(DELETE_KEY_PAIR_SUCCESS, () => {
    console.log('key pair deleted');
  });

  ipcRenderer.on(DELETE_KEY_PAIR_ERROR, () => {
    console.log('error delete key pair');
  });
};

export const getPublicKey = () => {
  ipcRenderer.send(GET_PUBLIC_KEY_EVENT);
};

export const deleteKeyPair = () => ipcRenderer.send(DELETE_KEY_PAIR);

export default registerKeysEvents;
