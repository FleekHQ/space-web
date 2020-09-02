import { ipcRenderer } from 'electron';
import store from '../store';
import { NOTIFICATIONS_ACTION_TYPES } from '../reducers/notifications';

const EVENT_PREFIX = 'notifications';
const READ_NOTIFICATION_EVENT = `${EVENT_PREFIX}:readNotification`;
const READ_NOTIFICATION_ERROR_EVENT = `${EVENT_PREFIX}:readNotification:error`;
const READ_NOTIFICATION_SUCCESS_EVENT = `${EVENT_PREFIX}:readNotification:success`;
const FETCH_NOTIFICATIONS = `${EVENT_PREFIX}:fetch`;
const FETCH_NOTIFICATIONS_ERROR = `${EVENT_PREFIX}:fetch:error`;
const FETCH_NOTIFICATIONS_SUCCESS = `${EVENT_PREFIX}:fetch:success`;
const ACCEPT_FILES_INVITATION = `${EVENT_PREFIX}:acceptFilesInvitation`;
const ACCEPT_FILES_INVITATION_SUCCESS = `${EVENT_PREFIX}:acceptFilesInvitation:success`;
const ACCEPT_FILES_INVITATION_ERROR = `${EVENT_PREFIX}:acceptFilesInvitation:error`;
const REJECT_FILES_INVITATION = `${EVENT_PREFIX}:rejectFilesInvitation`;
const REJECT_FILES_INVITATION_SUCCESS = `${EVENT_PREFIX}:rejectFilesInvitation:success`;
const REJECT_FILES_INVITATION_ERROR = `${EVENT_PREFIX}:rejectFilesInvitation:error`;
const SET_NOTIFICATIONS_LAST_SEEN_AT = `${EVENT_PREFIX}:setNotificationsLastSeenAt`;
const SET_NOTIFICATIONS_LAST_SEEN_AT_SUCCESS = `${EVENT_PREFIX}:setNotificationsLastSeenAt:success`;
const SET_NOTIFICATIONS_LAST_SEEN_AT_ERROR = `${EVENT_PREFIX}:setNotificationsLastSeenAt:error`;

const registerNotificationEvents = () => {
  ipcRenderer.on(FETCH_NOTIFICATIONS_ERROR, (_, error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });

  ipcRenderer.on(FETCH_NOTIFICATIONS_SUCCESS, (_, data) => {
    store.dispatch({
      type: NOTIFICATIONS_ACTION_TYPES.ON_FETCH_NOTIFICATIONS_SUCCESS,
      data,
    });
  });

  ipcRenderer.on(READ_NOTIFICATION_ERROR_EVENT, () => {
    // TODO: do something
  });

  ipcRenderer.on(READ_NOTIFICATION_SUCCESS_EVENT, () => {
    // TODO: do something
  });
};

export const readNotification = (payload) => {
  ipcRenderer.send(READ_NOTIFICATION_EVENT, payload);
};

export const fetchNotifications = (payload) => {
  store.dispatch({
    type: NOTIFICATIONS_ACTION_TYPES.ON_FETCH_NOTIFICATIONS,
  });
  ipcRenderer.send(FETCH_NOTIFICATIONS, payload);
};

export const acceptFilesInvitation = (payload) => {
  ipcRenderer.send(ACCEPT_FILES_INVITATION, payload);
};

ipcRenderer.on(ACCEPT_FILES_INVITATION_SUCCESS, (_, data) => {
  store.dispatch({
    type: NOTIFICATIONS_ACTION_TYPES.ON_UPDATE_INVITATION_STATUS,
    status: 'ACCEPTED',
    ...data,
  });
});

ipcRenderer.on(ACCEPT_FILES_INVITATION_ERROR, () => {
  // TODO: do something
});

export const rejectFilesInvitation = (payload) => {
  ipcRenderer.send(REJECT_FILES_INVITATION, payload);
};

ipcRenderer.on(REJECT_FILES_INVITATION_SUCCESS, (_, data) => {
  store.dispatch({
    type: NOTIFICATIONS_ACTION_TYPES.ON_UPDATE_INVITATION_STATUS,
    status: 'REJECTED',
    ...data,
  });
});

ipcRenderer.on(REJECT_FILES_INVITATION_ERROR, () => {
  // TODO: do something
});

export const setNotificationsLastSeenAt = (payload) => {
  ipcRenderer.send(SET_NOTIFICATIONS_LAST_SEEN_AT, payload);
};

ipcRenderer.on(SET_NOTIFICATIONS_LAST_SEEN_AT_SUCCESS, (_, data) => {
  store.dispatch({
    type: NOTIFICATIONS_ACTION_TYPES.SET_NOTIFICATIONS_LAST_SEEN_AT,
    lastSeenAt: data.timestamp,
  });
});

ipcRenderer.on(SET_NOTIFICATIONS_LAST_SEEN_AT_ERROR, (_, err) => {
  console.error(err);
});

export default registerNotificationEvents;
