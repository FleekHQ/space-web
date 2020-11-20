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
  // TODO: remove mock
  const user = {
    username: '',
    uuid: '1f43cec7-472b-47d8-b4ec-08d1d8f5e687',
    address: '0x9fa66f2cc560cbeaf85cb6ce6756ba77f655',
    publicKey: '4a0d2893c9e57839195acb5dfb818c9782f89136ff6d5a4dcea9626c3d74d502',
  };
  if (payload.torusRes) {
    user.address = payload.torusRes.publicAddress;
  } else {
    user.username = payload.username;
  }

  store.dispatch({
    user,
    type: SIGNIN_ACTION_TYPES.ON_SUBMIT_SUCCESS,
  });
};

/**
 * User signup
 * @param {Object} payload
 * @param {string=} payload.username
 * @param {string=} payload.password
 * @param {import('../utils/use-torus-sdk').TorusRes=} payload.torusRes
 */
export const signup = (payload) => {
  store.dispatch({
    type: SIGNUP_ACTION_TYPES.ON_SUBMIT,
  });
  // TODO: remove mock
  setTimeout(() => {
    const user = {
      username: '',
      uuid: '1f43cec7-472b-47d8-b4ec-08d1d8f5e687',
      address: '0x9fa66f2cc560cbeaf85cb6ce6756ba77f655',
      publicKey: '4a0d2893c9e57839195acb5dfb818c9782f89136ff6d5a4dcea9626c3d74d502',
    };
    if (payload.torusRes) {
      user.address = payload.torusRes.publicAddress;
    } else {
      user.username = payload.username;
    }

    store.dispatch({
      user,
      type: SIGNIN_ACTION_TYPES.ON_SUBMIT_SUCCESS,
    });
  }, 1000);
};

export const checkUsername = (payload) => {
};

export const restoreKeyPairViaMnemonic = (payload) => {
};

export default registerAuthEvents;
