import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';

export const NOTIFICATIONS_ACTION_TYPES = {
  ON_RESTART: 'ON_FETCH_NOTIFICATIONS_RESTART',
  ON_FETCH_NOTIFICATIONS: 'ON_FETCH_NOTIFICATIONS',
  ON_NEW_NOTIFICATION: 'ON_NEW_NOTIFICATION',
  ON_FETCH_NOTIFICATIONS_ERROR: 'ON_FETCH_NOTIFICATIONS_ERROR',
  ON_FETCH_NOTIFICATIONS_SUCCESS: 'ON_FETCH_NOTIFICATIONS_SUCCESS',
  ON_UPDATE_INVITATION_STATUS: 'ON_UPDATE_INVITATION_STATUS',
  SET_NOTIFICATIONS_LAST_SEEN_AT: 'SET_NOTIFICATIONS_LAST_SEEN_AT',
};

const DEFAULT_STATE = {
  error: null,
  loading: false,
  data: { lastSeenAt: 0, nextOffset: null, notifications: [] },
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case NOTIFICATIONS_ACTION_TYPES.ON_NEW_NOTIFICATION: {
      return ({
        ...state,
        data: {
          ...state.data,
          notifications: [
            { ...action.notification },
            ...state.data.notifications,
          ],
        },
      });
    }
    case NOTIFICATIONS_ACTION_TYPES.SET_NOTIFICATIONS_LAST_SEEN_AT: {
      return ({
        ...state,
        data: {
          ...state.data,
          lastSeenAt: action.lastSeenAt,
        },
      });
    }
    case NOTIFICATIONS_ACTION_TYPES.ON_UPDATE_INVITATION_STATUS: {
      const { id, status } = action;
      const { data: { notifications } } = state;

      const updatedNotificationIndex = notifications.findIndex(
        (notification) => (notification.id === id),
      );

      if (updatedNotificationIndex === -1) {
        return state;
      }
      const newNotifications = cloneDeep(notifications);
      newNotifications[updatedNotificationIndex].invitationValue.status = status;

      return {
        ...state,
        data: {
          ...state.data,
          notifications: newNotifications,
        },
      };
    }
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
      const newNotifications = cloneDeep(uniqBy([
        ...state.data.notifications,
        ...action.data.notifications,
      ], 'id'));

      return {
        ...state,
        loading: false,
        data: {
          ...action.data,
          notifications: newNotifications,
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
