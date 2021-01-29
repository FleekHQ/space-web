const DEFAULT_STATE = {};

export const DOWNLOAD_ACTION_TYPES = {
  ADD_DOWNLOAD: 'DELETE_OBJECT_ON_RESTART',
  UPDATE_DOWNLOAD_PROGRESS: 'UPDATE_DOWNLOAD_PROGRESS',
  UPDATE_DOWNLOAD_LINK: 'UPDATE_DOWNLOAD_LINK',
  REMOVE_DOWNLOAD: 'DELETE_OBJECT_ON_ERROR',
  ERROR_DOWNLOAD: 'ERROR_DOWNLOAD',
  HIDE_DOWNLOAD: 'HIDE_DOWNLOAD',
};

export const DOWNLOAD_STATES = {
  error: 'error',
  finished: 'finished',
  downloading: 'downloading',
  initializing: 'initializing',
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case DOWNLOAD_ACTION_TYPES.ADD_DOWNLOAD: {
      return {
        ...state,
        [action.payload.uuid]: {
          status: DOWNLOAD_STATES.initializing,
          progress: 0,
          link: null,
          filename: action.payload.filename,
          hide: false,
        },
      };
    }

    case DOWNLOAD_ACTION_TYPES.UPDATE_DOWNLOAD_PROGRESS: {
      return {
        ...state,
        [action.payload.uuid]: {
          ...state[action.payload.uuid],
          status: DOWNLOAD_STATES.downloading,
          progress: action.payload.progress,
          link: null,
        },
      };
    }

    case DOWNLOAD_ACTION_TYPES.UPDATE_DOWNLOAD_LINK: {
      return {
        ...state,
        [action.payload.uuid]: {
          ...state[action.payload.uuid],
          status: DOWNLOAD_STATES.finished,
          progress: 100,
          link: action.payload.link,
        },
      };
    }

    case DOWNLOAD_ACTION_TYPES.REMOVE_DOWNLOAD: {
      return Object.keys(state)
        .filter((uuid) => uuid !== action.payload.uuid)
        .reduce((acc, uuid) => {
          acc[uuid] = state[uuid];
          return acc;
        }, {});
    }

    case DOWNLOAD_ACTION_TYPES.ERROR_DOWNLOAD: {
      return {
        ...state,
        [action.payload.uuid]: {
          ...state[action.payload.uuid],
          status: DOWNLOAD_STATES.error,
          progress: 0,
          link: null,
          error: action.payload.error,
        },
      };
    }

    case DOWNLOAD_ACTION_TYPES.HIDE_DOWNLOAD: {
      return {
        ...state,
        [action.payload.uuid]: {
          ...state[action.payload.uuid],
          hide: true,
        },
      };
    }

    default: {
      return state;
    }
  }
};
