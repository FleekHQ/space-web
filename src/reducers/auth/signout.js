const DEFAULT_STATE = {
  error: null,
  success: false,
  loading: false,
};

export const SIGNOUT_ACTION_TYPES = {
  ON_SIGNOUT: 'ON_SIGNOUT',
  ON_SIGNOUT_RESET: 'ON_SIGNOUT_RESET',
  ON_SIGNOUT_ERROR: 'ON_SIGNOUT_ERROR',
  ON_SIGNOUT_SUCCESS: 'ON_SIGNOUT_SUCCESS',
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SIGNOUT_ACTION_TYPES.ON_SIGNOUT: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case SIGNOUT_ACTION_TYPES.ON_SIGNOUT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case SIGNOUT_ACTION_TYPES.ON_SIGNOUT_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
      };
    }
    case SIGNOUT_ACTION_TYPES.ON_SIGNOUT_RESET: {
      return {
        ...DEFAULT_STATE,
      };
    }
    default: {
      return state;
    }
  }
};
