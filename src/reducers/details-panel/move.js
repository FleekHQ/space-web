const DEFAULT_STATE = {
  moveFiles: [],
};

export const MOVE_TYPES = {
  ON_MOVE_FILES: 'ON_MOVE_FILES',
  ON_MOVE_FILES_LOADING: 'ON_MOVE_FILES_LOADING',
  ON_MOVE_FILES_SUCCESS: 'ON_MOVE_FILES_SUCCESS',
  ON_MOVE_FILES_ERROR: 'ON_MOVE_FILES_ERROR',
  ON_MOVE_FILES_REMOVE_ID: 'ON_MOVE_FILES_REMOVE_ID',
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case MOVE_TYPES.ON_MOVE_FILES: {
      return ({
        ...state,
        moveFiles: [
          ...state.moveFiles,
          {
            ...action.payload,
            preparing: true,
            error: false,
            loading: false,
            success: false,
          },
        ],
      });
    }
    case MOVE_TYPES.ON_MOVE_FILES_LOADING: {
      const itemIndex = state.moveFiles.findIndex((item) => (
        item.id === action.payload.notificationId
      ));

      return ({
        ...state,
        moveFiles: [
          ...state.moveFiles.slice(0, itemIndex),
          {
            ...state.moveFiles[itemIndex],
            ...action.payload,
            preparing: false,
            loading: true,
          },
          ...state.moveFiles.slice(itemIndex + 1),
        ],
      });
    }
    case MOVE_TYPES.ON_MOVE_FILES_SUCCESS: {
      const itemIndex = state.moveFiles.findIndex((item) => (
        item.id === action.payload.notificationId
      ));

      return ({
        ...state,
        moveFiles: [
          ...state.moveFiles.slice(0, itemIndex),
          {
            ...state.moveFiles[itemIndex],
            ...action.payload,
            preparing: false,
            loading: false,
            success: true,
          },
          ...state.moveFiles.slice(itemIndex + 1),
        ],
      });
    }
    case MOVE_TYPES.ON_MOVE_FILES_ERROR: {
      const itemIndex = state.moveFiles.findIndex((item) => (
        item.id === action.payload.notificationId
      ));

      return ({
        ...state,
        moveFiles: [
          ...state.moveFiles.slice(0, itemIndex),
          {
            ...state.moveFiles[itemIndex],
            preparing: false,
            success: false,
            error: action.payload.error,
          },
          ...state.moveFiles.slice(itemIndex + 1),
        ],
      });
    }
    case MOVE_TYPES.ON_MOVE_FILES_REMOVE_ID: {
      const itemIndex = state.moveFiles.findIndex((item) => (
        item.id === action.payloadnotificationId
      ));

      return ({
        ...state,
        moveFiles: [
          ...state.moveFiles.slice(0, itemIndex),
          ...state.moveFiles.slice(itemIndex + 1),
        ],
      });
    }
    default: {
      return state;
    }
  }
};
