const DEFAULT_STATE = {
  error: null,
  success: false,
  loading: false,
};

export const SIGNUP_ACTION_TYPES = {
  ON_RESET: 'SIGNUP_ON_RESET',
  ON_SUBMIT: 'SIGNUP_ON_SUBMIT',
  ON_SUBMIT_ERROR: 'SIGNUP_ON_SUBMIT_ERROR',
  ON_SUBMIT_SUCCESS: 'SIGNUP_ON_SUBMIT_SUCCESS',
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SIGNUP_ACTION_TYPES.ON_SUBMIT: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case SIGNUP_ACTION_TYPES.ON_SUBMIT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case SIGNUP_ACTION_TYPES.ON_SUBMIT_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
      };
    }
    case SIGNUP_ACTION_TYPES.ON_RESET: {
      return {
        ...DEFAULT_STATE,
      };
    }
    default: {
      return state;
    }
  }
};
