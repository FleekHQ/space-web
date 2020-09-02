import { USER_ACTION_TYPES } from '../user';

const DTAULT_STATE = {
  error: null,
};

export default (state = DTAULT_STATE, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.ON_UPDATE_AVATAR: {
      return {
        ...state,
        error: null,
      };
    }
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
