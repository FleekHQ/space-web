const DEFAULT_STATE = {
  error: null,
  success: false,
  loading: false,
};

export const DELETE_ACCOUNT_ACTION_TYPES = {
  ON_DELETE_ACCOUNT: 'ON_DELETE_ACCOUNT',
  ON_DELETE_ACCOUNT_ERROR: 'ON_DELETE_ACCOUNT_ERROR',
  ON_DELETE_ACCOUNT_SUCCESS: 'ON_DELETE_ACCOUNT_SUCCESS',
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case DELETE_ACCOUNT_ACTION_TYPES.ON_DELETE_ACCOUNT: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case DELETE_ACCOUNT_ACTION_TYPES.ON_DELETE_ACCOUNT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case DELETE_ACCOUNT_ACTION_TYPES.ON_DELETE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        success: true,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
