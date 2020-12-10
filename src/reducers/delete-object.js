const DEFAULT_STATE = {
  error: null,
  success: false,
  loading: false,
};

export const DELETE_OBJECT_ACTION_TYPES = {
  ON_SUBMIT: 'DELETE_OBJECT_ON_SUBMIT',
  ON_RESTART: 'DELETE_OBJECT_ON_RESTART',
  ON_ERROR: 'DELETE_OBJECT_ON_ERROR',
  ON_SUCCESS: 'DELETE_OBJECT_ON_SUCCESS',
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case DELETE_OBJECT_ACTION_TYPES.ON_SUBMIT: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case DELETE_OBJECT_ACTION_TYPES.ON_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case DELETE_OBJECT_ACTION_TYPES.ON_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
      };
    }
    case DELETE_OBJECT_ACTION_TYPES.ON_RESTART: {
      return {
        ...DEFAULT_STATE,
      };
    }
    default: {
      return state;
    }
  }
};
