import { ipcRenderer } from 'electron';
import { NOTIFICATIONS_ACTION_TYPES } from '../reducers/notifications';
import store from '../store';

const NOTIFICATION_SUBSCRIBE_SUCCESS = 'notificationSubscribe:success';
const NOTIFICATION_SUBSCRIBE_ERROR = 'notificationSubscribe:error';

const registerNotificationSubscribe = () => {
  ipcRenderer.on(NOTIFICATION_SUBSCRIBE_SUCCESS, (_, notification) => {
    store.dispatch({
      type: NOTIFICATIONS_ACTION_TYPES.ON_NEW_NOTIFICATION,
      notification,
    });
  });
  ipcRenderer.on(NOTIFICATION_SUBSCRIBE_ERROR, (_, error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
};

export default registerNotificationSubscribe;
