/* eslint-disable no-unused-vars */
import store from '../store';
import { SIGNUP_ACTION_TYPES } from '../reducers/auth/signup';
import { SIGNIN_ACTION_TYPES } from '../reducers/auth/signin';

const registerAuthEvents = () => {
};

/**
 * User signin
 * @param {Object} payload
 * @param {string=} payload.username
 * @param {string=} payload.password
 * @param {Object=} payload.torusRes
 */
export const signin = (payload) => {
  store.dispatch({
    type: SIGNIN_ACTION_TYPES.ON_SUBMIT,
  });
};

/**
 * User signup
 * @param {Object} payload
 * @param {string=} payload.username
 * @param {string=} payload.password
 * @param {Object=} payload.torusRes
 */
export const signup = (payload) => {
  store.dispatch({
    type: SIGNUP_ACTION_TYPES.ON_SUBMIT,
  });
};

export const checkUsername = (payload) => {
};

export const restoreKeyPairViaMnemonic = (payload) => {
};

export default registerAuthEvents;
