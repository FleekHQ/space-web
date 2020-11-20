const DEFAULT_STATE = {
  generateLink: {
    error: null,
    success: false,
    loading: false,
  },
  shareFileByPublicKey: [],
};

export const SHARE_TYPES = {
  ON_SHARE_FILE_BY_PUBLIC_KEY: 'ON_SHARE_FILE_BY_PUBLIC_KEY',
  SHARE_FILE_BY_PUBLIC_KEY_REMOVE_BY_ID: 'SHARE_FILE_BY_PUBLIC_KEY_REMOVE_BY_ID',
  ON_SHARE_FILE_BY_PUBLIC_KEY_ERROR: 'ON_SHARE_FILE_BY_PUBLIC_KEY_ERROR',
  ON_SHARE_FILE_BY_PUBLIC_KEY_SUCCESS: 'ON_SHARE_FILE_BY_PUBLIC_KEY_SUCCESS',
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SHARE_TYPES.ON_SHARE_FILE_BY_PUBLIC_KEY: {
      return {
        ...state,
        shareFileByPublicKey: [
          ...state.shareFileByPublicKey,
          {
            ...action.payload,
            error: false,
            loading: true,
            success: false,
          },
        ],
      };
    }
    case SHARE_TYPES.ON_SHARE_FILE_BY_PUBLIC_KEY_ERROR: {
      const itemIndex = state.shareFileByPublicKey.findIndex((item) => (
        item.id === action.notificationId));

      return ({
        ...state,
        shareFileByPublicKey: [
          ...state.shareFileByPublicKey.slice(0, itemIndex),
          {
            ...state.shareFileByPublicKey[itemIndex],
            error: action.error,
            loading: false,
            success: false,
          },
          ...state.shareFileByPublicKey.slice(itemIndex + 1),
        ],
      });
    }
    case SHARE_TYPES.ON_SHARE_FILE_BY_PUBLIC_KEY_SUCCESS: {
      const itemIndex = state.shareFileByPublicKey.findIndex((item) => (
        item.id === action.notificationId));

      return {
        ...state,
        shareFileByPublicKey: [
          ...state.shareFileByPublicKey.slice(0, itemIndex),
          {
            ...state.shareFileByPublicKey[itemIndex],
            error: false,
            loading: false,
            success: true,
          },
          ...state.shareFileByPublicKey.slice(itemIndex + 1),
        ],
      };
    }
    case SHARE_TYPES.SHARE_FILE_BY_PUBLIC_KEY_REMOVE_BY_ID: {
      const itemIndex = state.shareFileByPublicKey.findIndex((item) => (
        item.id === action.notificationId));

      return {
        ...state,
        shareFileByPublicKey: [
          ...state.shareFileByPublicKey.slice(0, itemIndex),
          ...state.shareFileByPublicKey.slice(itemIndex + 1),
        ],
      };
    }
    default: {
      return state;
    }
  }
};
