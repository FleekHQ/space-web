export const PUBLIC_LINK_ACTION_TYPES = {
  ON_SUCCESS: 'ON_SUCCESS',
  ON_GET: 'ON_GET',
  ON_ERROR: 'ON_ERROR',
  ON_RESTART: 'ON_RESTART',
};

const DEFAULT_STATE = {
  error: null,
  loading: false,
  linkInfo: {},
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case PUBLIC_LINK_ACTION_TYPES.ON_GET: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case PUBLIC_LINK_ACTION_TYPES.ON_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        linkInfo: action.payload,
      };
    }

    case PUBLIC_LINK_ACTION_TYPES.ON_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        linkInfo: {},
      };
    }

    case PUBLIC_LINK_ACTION_TYPES.ON_RESTART: {
      return {
        ...DEFAULT_STATE,
      };
    }

    default: {
      return state;
    }
  }
};
