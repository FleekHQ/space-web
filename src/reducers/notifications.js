export const NOTIFICATIONS_ACTION_TYPES = {
  ON_RESTART: 'ON_FETCH_NOTIFICATIONS_RESTART',
  ON_FETCH_NOTIFICATIONS: 'ON_FETCH_NOTIFICATIONS',
  ON_FETCH_NOTIFICATIONS_ERROR: 'ON_GET_MNEMONIC_ERROR',
  ON_FETCH_NOTIFICATIONS_SUCCESS: 'ON_GET_MNEMONIC_SUCCESS',
};

const DEFAULT_STATE = {
  error: null,
  loading: false,
  data: { notifications: [] },
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case NOTIFICATIONS_ACTION_TYPES.ON_FETCH_NOTIFICATIONS: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case NOTIFICATIONS_ACTION_TYPES.ON_FETCH_NOTIFICATIONS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case NOTIFICATIONS_ACTION_TYPES.ON_FETCH_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: {
          ...action.data,
          notifications: [
            ...state.data.notifications,
            ...action.data.notifications,
          ],
        },
      };
    }
    case NOTIFICATIONS_ACTION_TYPES.ON_RESTART: {
      return {
        ...DEFAULT_STATE,
      };
    }
    default: {
      return state;
    }
  }
};
