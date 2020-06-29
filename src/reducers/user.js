import electronStore from '@electron-store';

import { SIGNUP_ACTION_TYPES } from './auth/signup';

let user;
const USER_KEY = '_u';

try {
  user = JSON.parse(electronStore.get(USER_KEY));
} catch (error) {
  user = null;
}

export default (state = user, action) => {
  switch (action.type) {
    case SIGNUP_ACTION_TYPES.ON_SUBMIT_SUCCESS: {
      electronStore.set(USER_KEY, JSON.stringify(action.user));

      return {
        ...action.user,
      };
    }
    default: {
      return state;
    }
  }
};
