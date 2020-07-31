import { ipcRenderer } from 'electron';

const EVENT_PREFIX = 'notifications';
const READ_NOTIFICATION_EVENT = `${EVENT_PREFIX}:readNotification`;
const READ_NOTIFICATION_ERROR_EVENT = `${EVENT_PREFIX}:readNotification:error`;
const READ_NOTIFICATION_SUCCESS_EVENT = `${EVENT_PREFIX}:readNotification:success`;

const registerNotificationsEvents = () => {
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

export default registerNotificationsEvents;
