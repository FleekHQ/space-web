import electronStore from '@electron-store';

import { SIGNIN_ACTION_TYPES } from './auth/signin';
import { SIGNUP_ACTION_TYPES } from './auth/signup';
import { RESTORE_KEYS_MNEMONIC_ACTION_TYPES } from './auth/restore-keys-mnemonic';

export const UPDATE_USER = 'UPDATE_USER';
export const USER_ACTION_TYPES = {
  UPDATE_USER: 'UPDATE_USER',
  ON_USER_LOGOUT: 'ON_USER_LOGOUT',
  ON_UPDATE_AVATAR: 'ON_UPDATE_AVATAR',
  ON_UPDATE_AVATAR_ERROR: 'ON_UPDATE_AVATAR_ERROR',
  ON_UPDATE_AVATAR_SUCCESS: 'ON_UPDATE_AVATAR_SUCCESS',
  FETCHING_IDENTITY_ERROR: 'USER_ACTION_FETCHING_IDENTITY_ERROR',
  ON_CREATE_PASSWORD_AND_USERNAME: 'ON_CREATE_PASSWORD_AND_USERNAME',
  ON_CREATE_PASSWORD_AND_USERNAME_RESET: 'ON_CREATE_PASSWORD_AND_USERNAME_RESET',
  ON_CREATE_PASSWORD_AND_USERNAME_ERROR: 'ON_CREATE_PASSWORD_AND_USERNAME_ERROR',
  ON_CREATE_PASSWORD_AND_USERNAME_SUCCESS: 'ON_CREATE_PASSWORD_AND_USERNAME_SUCCESS',
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
    username: '',
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
      electronStore.delete(USER_KEY);
      return null;
    }

    case USER_ACTION_TYPES.ON_UPDATE_AVATAR: {
      return {
        ...state,
        uploadingAvatar: true,
      };
    }

    case USER_ACTION_TYPES.ON_UPDATE_AVATAR_ERROR: {
      return {
        ...state,
        uploadingAvatar: false,
      };
    }

    case USER_ACTION_TYPES.ON_UPDATE_AVATAR_SUCCESS: {
      return writeUser(state, {
        ...action.user,
        uploadingAvatar: false,
      });
    }

    case USER_ACTION_TYPES.ON_CREATE_PASSWORD_AND_USERNAME: {
      return {
        ...state,
        creatingUsernameAndPassword: true,
        creatingUsernameAndPasswordError: null,
        creatingUsernameAndPasswordSuccess: null,
      };
    }

    case USER_ACTION_TYPES.ON_CREATE_PASSWORD_AND_USERNAME_ERROR: {
      return {
        ...state,
        creatingUsernameAndPassword: false,
        creatingUsernameAndPasswordSuccess: null,
        creatingUsernameAndPasswordError: action.error,
      };
    }

    case USER_ACTION_TYPES.ON_CREATE_PASSWORD_AND_USERNAME_SUCCESS: {
      return writeUser(state, {
        ...action.user,
        creatingUsernameAndPassword: false,
        creatingUsernameAndPasswordSuccess: true,
      });
    }

    case USER_ACTION_TYPES.ON_CREATE_PASSWORD_AND_USERNAME_RESET: {
      return writeUser(state, {
        ...action.user,
        creatingUsernameAndPassword: false,
        creatingUsernameAndPasswordError: null,
        creatingUsernameAndPasswordSuccess: null,
      });
    }

    default: {
      return state;
    }
  }
};
