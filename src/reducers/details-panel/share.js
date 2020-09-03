const DEFAULT_STATE = {
  generateLink: {
    error: null,
    success: false,
    loading: false,
  },
  shareFileByPublicKey: {
    error: null,
    success: false,
    loading: false,
  },
};

export const SHARE_TYPES = {
  ON_SHARE_FILE_BY_PUBLIC_KEY: 'ON_SHARE_FILE_BY_PUBLIC_KEY',
  ON_SHARE_FILE_BY_PUBLIC_KEY_RESET: 'ON_SHARE_FILE_BY_PUBLIC_KEY_RESET',
  ON_SHARE_FILE_BY_PUBLIC_KEY_ERROR: 'ON_SHARE_FILE_BY_PUBLIC_KEY_ERROR',
  ON_SHARE_FILE_BY_PUBLIC_KEY_SUCCESS: 'ON_SHARE_FILE_BY_PUBLIC_KEY_SUCCESS',
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SHARE_TYPES.ON_SHARE_FILE_BY_PUBLIC_KEY: {
      return {
        ...state,
        shareFileByPublicKey: {
          error: null,
          loading: true,
          success: false,
        },
      };
    }
    case SHARE_TYPES.ON_SHARE_FILE_BY_PUBLIC_KEY_ERROR: {
      return {
        ...state,
        shareFileByPublicKey: {
          ...state.shareFileByPublicKey,
          loading: false,
          error: action.error,
        },
      };
    }
    case SHARE_TYPES.ON_SHARE_FILE_BY_PUBLIC_KEY_SUCCESS: {
      return {
        ...state,
        shareFileByPublicKey: {
          ...state.shareFileByPublicKey,
          success: true,
          loading: false,
        },
      };
    }
    case SHARE_TYPES.ON_SHARE_FILE_BY_PUBLIC_KEY_RESET: {
      return {
        ...state,
        shareFileByPublicKey: {
          ...DEFAULT_STATE.shareFileByPublicKey,
        },
      };
    }
    default: {
      return state;
    }
  }
};
