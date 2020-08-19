import electronStore from '@electron-store';

import { SIGNUP_ACTION_TYPES } from './auth/signup';

export const UPDATE_USER = 'UPDATE_USER';

let user;
const USER_KEY = '_u';

try {
  user = JSON.parse(electronStore.get(USER_KEY));
} catch (error) {
  user = null;
}

const writeUser = (state, userInfo) => {
  const newUserState = {
    ...(state && state),
    ...userInfo,
  };

  electronStore.set(USER_KEY, JSON.stringify(newUserState));

  return newUserState;
};

export default (state = user, action) => {
  switch (action.type) {
    case SIGNUP_ACTION_TYPES.ON_SUBMIT_SUCCESS: {
      return writeUser(state, action.user);
    }

    case UPDATE_USER: {
      return writeUser(state, action.user);
    }

    default: {
      return state;
    }
  }
};
