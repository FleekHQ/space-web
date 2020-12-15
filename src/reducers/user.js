import pick from 'lodash/pick';

import { SIGNIN_ACTION_TYPES } from './auth/signin';
import { SIGNUP_ACTION_TYPES } from './auth/signup';
import { RESTORE_KEYS_MNEMONIC_ACTION_TYPES } from './auth/restore-keys-mnemonic';

export const UPDATE_USER = 'UPDATE_USER';
export const USER_ACTION_TYPES = {
  UPDATE_USER: 'UPDATE_USER',
  ON_USER_LOGOUT: 'ON_USER_LOGOUT',
  ON_UPDATING_USER: 'ON_UPDATING_USER',
  ON_UPDATING_USER_ERROR: 'ON_UPDATING_USER_ERROR',
  ON_UPDATING_USER_RESET: 'ON_UPDATING_USER_RESET',
  ON_UPDATE_AVATAR: 'ON_UPDATE_AVATAR',
  ON_UPDATE_AVATAR_ERROR: 'ON_UPDATE_AVATAR_ERROR',
  ON_UPDATE_AVATAR_SUCCESS: 'ON_UPDATE_AVATAR_SUCCESS',
  ON_CREATE_PASSWORD_AND_USERNAME: 'ON_CREATE_PASSWORD_AND_USERNAME',
  ON_CREATE_PASSWORD_AND_USERNAME_RESET: 'ON_CREATE_PASSWORD_AND_USERNAME_RESET',
  ON_CREATE_PASSWORD_AND_USERNAME_ERROR: 'ON_CREATE_PASSWORD_AND_USERNAME_ERROR',
  ON_CREATE_PASSWORD_AND_USERNAME_SUCCESS: 'ON_CREATE_PASSWORD_AND_USERNAME_SUCCESS',
};

let user = {
  uuid: '1f43cec7-472b-47d8-b4ec-08d1d8f5e687',
  address: '0x9fa66f2cc560cbeaf85cb6ce6756ba77f655',
  publicKey: '4a0d2893c9e57839195acb5dfb818c9782f89136ff6d5a4dcea9626c3d74d502',
  username: 'teester20m',
  avatarUrl: '',
};
const USER_KEY = '_u';

try {
  user = JSON.parse(window.localStorage.getItem(USER_KEY));
} catch (error) {
  user = null;
}

const writeUser = (state, userInfo) => {
  const newUserState = {
    username: '',
    ...(state),
    ...userInfo,
  };

  window.localStorage.setItem(
    USER_KEY,
    JSON.stringify(
      pick(newUserState, ['uuid', 'address', 'publicKey', 'displayName', 'avatarUrl', 'username']),
    ),
  );

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
      return writeUser(state, {
        ...action.user,
        updatingUser: false,
        updatingUserError: null,
        updatingUserSuccess: true,
      });
    }

    case USER_ACTION_TYPES.ON_UPDATING_USER: {
      return {
        ...state,
        updatingUser: true,
        updatingUserError: null,
        updatingUserSuccess: false,
      };
    }

    case USER_ACTION_TYPES.ON_UPDATING_USER_ERROR: {
      return {
        ...state,
        updatingUser: false,
        updatingUserError: action.error,
      };
    }

    case USER_ACTION_TYPES.ON_UPDATING_USER_RESET: {
      return {
        ...state,
        updatingUser: false,
        updatingUserError: null,
        updatingUserSuccess: false,
      };
    }

    case USER_ACTION_TYPES.ON_USER_LOGOUT: {
      window.localStorage.removeItem(USER_KEY);
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
