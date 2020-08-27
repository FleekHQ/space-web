export const CHANGE_PASSWORD_ACTION_TYPES = {
  ON_RESET: 'CHANGE_PASSWORD_ON_RESET',
  ON_REQUEST: 'CHANGE_PASSWORD_ON_REQUEST',
  ON_REQUEST_ERROR: 'CHANGE_PASSWORD_ON_REQUEST_ERROR',
  ON_REQUEST_SUCCESS: 'CHANGE_PASSWORD_ON_REQUEST_SUCCESS',
};

const DEFAULT_STATE = {
  error: null,
  loading: false,
  success: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_ACTION_TYPES.ON_RESET: {
      return {
        ...DEFAULT_STATE,
      };
    }
    case CHANGE_PASSWORD_ACTION_TYPES.ON_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case CHANGE_PASSWORD_ACTION_TYPES.ON_REQUEST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case CHANGE_PASSWORD_ACTION_TYPES.ON_REQUEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
      };
    }
    default: {
      return state;
    }
  }
};
