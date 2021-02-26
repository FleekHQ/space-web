import { sdk } from '@clients';
import { notificationPresenter } from '@utils';
import { NOTIFICATIONS_ACTION_TYPES } from '../reducers/notifications';
import store from '../store';

const registerNotificationSubscribe = async () => {
  const storage = await sdk.getStorage();
  await storage.initListener();

  const response = await storage.notificationSubscribe();

  const handler = (data) => {
    const { notification } = data;
    store.dispatch({
      type: NOTIFICATIONS_ACTION_TYPES.ON_NEW_NOTIFICATION,
      notification: notificationPresenter(notification),
    });
  };

  response.on('data', handler);

  return (() => {
    response.off('data', handler);
  });
};

export default registerNotificationSubscribe;
