import { USER_ACTION_TYPES } from '../user';

const DEFAULT_STATE = {
  error: null,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.UPDATE_USER:
    case USER_ACTION_TYPES.ON_UPDATE_AVATAR: {
      return {
        ...state,
        error: null,
      };
    }
    case USER_ACTION_TYPES.FETCHING_IDENTITY_ERROR:
    case USER_ACTION_TYPES.ON_UPDATE_AVATAR_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};
