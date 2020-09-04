const { spaceClient } = require('../clients');

const NOTIFICATION_SUBSCRIBE_SUCCESS = 'notificationSubscribe:success';
const NOTIFICATION_SUBSCRIBE_ERROR = 'notificationSubscribe:error';

const registerNotificationSubscribe = (mainWindow) => {
  const eventStream = spaceClient.notificationSubscribe();

  eventStream.on('data', async (data) => {
    mainWindow.webContents.send(NOTIFICATION_SUBSCRIBE_SUCCESS, data);
  });

  eventStream.on('error', (error) => {
    try {
      mainWindow.webContents.send(NOTIFICATION_SUBSCRIBE_ERROR, error);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  });

  return eventStream;
};

module.exports = registerNotificationSubscribe;
