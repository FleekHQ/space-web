import electronStore from '@electron-store';

import { SIGNIN_ACTION_TYPES } from './auth/signin';
import { SIGNUP_ACTION_TYPES } from './auth/signup';
import { RESTORE_KEYS_MNEMONIC_ACTION_TYPES } from './auth/restore-keys-mnemonic';

export const UPDATE_USER = 'UPDATE_USER';
export const USER_ACTION_TYPES = {
  ON_USER_LOGOUT: 'ON_USER_LOGOUT',
};

let user;
const USER_KEY = '_u';

try {
  user = JSON.parse(electronStore.get(USER_KEY));
} catch (error) {
  user = null;
}

const writeUser = (state, userInfo) => {
  const newUserState = {
    ...(state),
    ...userInfo,
  };

  electronStore.set(USER_KEY, JSON.stringify(newUserState));

  return newUserState;
};

export default (state = user, action) => {
  switch (action.type) {
    case SIGNIN_ACTION_TYPES.ON_SUBMIT_SUCCESS:
    case SIGNUP_ACTION_TYPES.ON_SUBMIT_SUCCESS:
    case RESTORE_KEYS_MNEMONIC_ACTION_TYPES.ON_SUBMIT_SUCCESS: {
      return writeUser(state, action.user);
    }

    case UPDATE_USER: {
      return writeUser(state, action.user);
    }

    case USER_ACTION_TYPES.ON_USER_LOGOUT: {
      electronStore.clear();
      return null;
    }

    default: {
      return state;
    }
  }
};
