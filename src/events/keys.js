import { ipcRenderer } from 'electron';

import store from '../store';
import { SIGNUP_ACTION_TYPES } from '../reducers/auth/signup';

const EVENT_PREFIX = 'keys';
const GET_PUBLIC_KEY_EVENT = `${EVENT_PREFIX}:publicKey`;
const GET_PUBLIC_KEY_ERROR_EVENT = `${EVENT_PREFIX}:publicKey:error`;
const GET_PUBLIC_KEY_SUCCESS_EVENT = `${EVENT_PREFIX}:publicKey:success`;

const registerKeysEvents = () => {
  ipcRenderer.on(GET_PUBLIC_KEY_ERROR_EVENT, (_, error) => {
    // eslint-disable-next-line no-console
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
    });
  });
};

export const getPublicKey = () => {
  ipcRenderer.send(GET_PUBLIC_KEY_EVENT);
};

export default registerKeysEvents;
