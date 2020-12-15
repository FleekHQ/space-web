// Uncomment once payload parameter is ussed
/* eslint-disable no-unused-vars */
import { ERROR_MODAL_TOAST, OPEN_MODAL } from '@shared/components/Modal/actions';

import store from '../store';
import { NOTIFICATIONS_ACTION_TYPES } from '../reducers/notifications';

/* eslint-disable no-console */
const registerNotificationEvents = (history) => {
};

export const readNotification = (payload) => {
};

export const fetchNotifications = (payload) => {
  store.dispatch({
    type: NOTIFICATIONS_ACTION_TYPES.ON_FETCH_NOTIFICATIONS,
  });
};

export const handleFilesInvitation = (payload) => {
  store.dispatch({
    type: NOTIFICATIONS_ACTION_TYPES.ON_UPDATE_INVITATION_STATUS,
    status: payload.accept ? 'ACCEPTING' : 'REJECTING',
    ...payload,
  });
};

export const setNotificationsLastSeenAt = (payload) => {
  store.dispatch({
    type: NOTIFICATIONS_ACTION_TYPES.SET_NOTIFICATIONS_LAST_SEEN_AT,
    lastSeenAt: payload.timestamp,
  });
};

export default registerNotificationEvents;
