const DEFAULT_STATE = {
  isAuthenticated: false,
  isAuthenticating: false,
  authenticatingError: null,
};

export const AUTH_ACTION_TYPES = {
  ON_RESET: 'AUTH_ON_RESET',
  ON_AUTHENTICATION: 'ON_AUTHENTICATION',
  ON_AUTHENTICATION_ERROR: 'ON_AUTHENTICATION_ERROR',
  ON_AUTHENTICATION_SUCCESS: 'ON_AUTHENTICATION_SUCCESS',
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.ON_AUTHENTICATION: {
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: true,
        authenticatingError: null,
      };
    }
    case AUTH_ACTION_TYPES.ON_AUTHENTICATION_ERROR: {
      return {
        ...state,
        isAuthenticating: false,
        authenticatingError: action.error,
      };
    }
    case AUTH_ACTION_TYPES.ON_AUTHENTICATION_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        isAuthenticating: false,
      };
    }
    case AUTH_ACTION_TYPES.ON_RESET: {
      return {
        ...DEFAULT_STATE,
      };
    }
    default: {
      return state;
    }
  }
};
