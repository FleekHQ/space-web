let user;
const USER_KEY = '_u';

export const USER_ACTION_TYPES = {
  ON_USER_SIGNUP: 'ON_USER_SIGNUP',
};

try {
  user = JSON.parse(window.localStorage.getItem(USER_KEY));
} catch (error) {
  user = null;
}

export default (state = user, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.ON_USER_SIGNUP: {
      window.localStorage.setItem(USER_KEY, JSON.stringify(action.user));

      return {
        ...action.user,
      };
    }
    default: {
      return state;
    }
  }
};
