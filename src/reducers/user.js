import electronStore from '@electron-store';

let user;
const USER_KEY = '_u';

export const USER_ACTION_TYPES = {
  ON_USER_SIGNUP: 'ON_USER_SIGNUP',
};

try {
  user = JSON.parse(electronStore.get(USER_KEY));
} catch (error) {
  user = null;
}

export default (state = user, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.ON_USER_SIGNUP: {
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
