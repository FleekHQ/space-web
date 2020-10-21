export const OPEN_PUBLIC_FILE_ACTION_TYPES = {
  ON_OPEN: 'ON_OPEN_PUBLIC_FILE',
  ON_ERROR: 'ON_ERROR_OPEN_PUBLIC_FILE',
  ON_SUCCESS: 'ON_SUCCESS_OPEN_PUBLIC_FILE',
};

const DEFAULT_STATE = {
  error: null,
  loading: false,
  location: null,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case OPEN_PUBLIC_FILE_ACTION_TYPES.ON_OPEN: {
      return {
        ...state,
        error: null,
        location: null,
        loading: true,
      };
    }
    case OPEN_PUBLIC_FILE_ACTION_TYPES.ON_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case OPEN_PUBLIC_FILE_ACTION_TYPES.ON_SUCCESS: {
      return {
        ...state,
        loading: false,
        location: action.location,
      };
    }
    default: {
      return state;
    }
  }
};
