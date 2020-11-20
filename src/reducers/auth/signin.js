const DEFAULT_STATE = {
  error: null,
  success: false,
  loading: false,
};

export const SIGNIN_ACTION_TYPES = {
  ON_RESET: 'SIGNIN_ON_RESET',
  ON_SUBMIT: 'SIGNIN_ON_SIGNIN',
  ON_SUBMIT_ERROR: 'SIGNIN_ON_SUBMIT_ERROR',
  ON_SUBMIT_SUCCESS: 'SIGNIN_ON_SUBMIT_SUCCESS',
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SIGNIN_ACTION_TYPES.ON_SUBMIT: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case SIGNIN_ACTION_TYPES.ON_SUBMIT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case SIGNIN_ACTION_TYPES.ON_SUBMIT_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
      };
    }
    case SIGNIN_ACTION_TYPES.ON_RESET: {
      return {
        ...DEFAULT_STATE,
      };
    }
    default: {
      return state;
    }
  }
};
