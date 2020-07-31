import { ipcRenderer } from 'electron';

const EVENT_PREFIX = 'notifications';
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
    console.log(data);
  });
};

export const fetchNotifications = (payload) => ipcRenderer.send(FETCH_NOTIFICATIONS, payload);

export default registerNotificationEvents;
