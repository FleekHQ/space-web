const DEFAULT_STATE = {
  generateLink: {
    error: null,
    success: false,
    loading: false,
  },
};

export const SHARE_TYPES = {
  ON_GENERATE_LINK: 'ON_GENERATE_LINK',
  ON_GENERATE_LINK_RESET: 'ON_GENERATE_LINK_RESET',
  ON_GENERATE_LINK_ERROR: 'ON_GENERATE_LINK_ERROR',
  ON_GENERATE_LINK_SUCCESS: 'ON_GENERATE_LINK_SUCCESS',
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SHARE_TYPES.ON_GENERATE_LINK: {
      return {
        ...state,
        generateLink: {
          ...state.generateLink,
          loading: true,
        },
      };
    }
    case SHARE_TYPES.ON_GENERATE_LINK_ERROR: {
      return {
        ...state,
        generateLink: {
          ...state.generateLink,
          loading: false,
          error: action.error,
        },
      };
    }
    case SHARE_TYPES.ON_GENERATE_LINK_SUCCESS: {
      return {
        ...state,
        generateLink: {
          error: null,
          loading: false,
          success: {
            ...action.payload,
          },
        },
      };
    }
    case SHARE_TYPES.ON_GENERATE_LINK_RESET: {
      return {
        ...state,
        generateLink: {
          ...DEFAULT_STATE.generateLink,
        },
      };
    }
    default: {
      return state;
    }
  }
};
