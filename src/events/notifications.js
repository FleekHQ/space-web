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

const registerNotificationEvents = () => {
  ipcRenderer.on(FETCH_NOTIFICATIONS_ERROR, (_, error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });

  ipcRenderer.on(FETCH_NOTIFICATIONS_SUCCESS, (_, data) => {
    // eslint-disable-next-line no-console
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

export const fetchNotifications = (payload) => ipcRenderer.send(FETCH_NOTIFICATIONS, payload);

export default registerNotificationEvents;
