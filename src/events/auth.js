import { ipcRenderer } from 'electron';

import store from '../store';
import { SIGNUP_ACTION_TYPES } from '../reducers/auth/signup';

const EVENT_PREFIX = 'auth';
const SIGNUP_EVENT = `${EVENT_PREFIX}:signup`;
const SIGNUP_ERROR_EVENT = `${EVENT_PREFIX}:signup:error`;
const SIGNUP_SUCCESS_EVENT = `${EVENT_PREFIX}:signup:success`;
const CHECK_USERNAME_EVENT = `${EVENT_PREFIX}:check_username`;
const CHECK_USERNAME_ERROR_EVENT = `${EVENT_PREFIX}:check_username:error`;
const CHECK_USERNAME_SUCCESS_EVENT = `${EVENT_PREFIX}:check_username:success`;

const registerAuthEvents = () => {
  /* Signup events */
  ipcRenderer.on(SIGNUP_ERROR_EVENT, (_, error) => {
    // eslint-disable-next-line
    console.error('signup error payload: ', error);

    let errorKey = 'modules.signup.errors.';
    if (error.message.includes('address')) {
      errorKey += 'address';
    }
    if (error.message.includes('username')) {
      errorKey += 'username';
    }

    store.dispatch({
      error: errorKey,
      type: SIGNUP_ACTION_TYPES.ON_SUBMIT_ERROR,
    });
  });

  ipcRenderer.on(SIGNUP_SUCCESS_EVENT, (_, payload) => {
    store.dispatch({
      type: SIGNUP_ACTION_TYPES.ON_SUBMIT_SUCCESS,
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

export const singup = (payload) => {
  ipcRenderer.send(SIGNUP_EVENT, payload);
};

export const checkUsername = (payload) => {
  ipcRenderer.send(CHECK_USERNAME_EVENT, payload);
};

export default registerAuthEvents;
