const { spaceClient } = require('../clients');
const { mapNotification } = require('../utils');
const { listDirectories } = require('./objects');

const NOTIFICATION_SUBSCRIBE_SUCCESS = 'notificationSubscribe:success';
const NOTIFICATION_SUBSCRIBE_ERROR = 'notificationSubscribe:error';
const INVITATION_REPLY = 'INVITATION_REPLY';

const registerNotificationSubscribe = async (mainWindow) => {
  let eventStream = () => {};
  try {
    eventStream = await spaceClient.notificationSubscribe();

    eventStream.on('data', async (data) => {
      const notification = data.getNotification();

      const mappedNotification = mapNotification(notification);

      mainWindow.webContents.send(NOTIFICATION_SUBSCRIBE_SUCCESS, mappedNotification);

      if (mappedNotification.type === INVITATION_REPLY) {
        await listDirectories(mainWindow);
      }
    });

    /* eslint-disable no-console */
    eventStream.on('error', (error) => {
      try {
        console.error('NOTIFICATION_SUBSCRIBE_ERROR', error);
        mainWindow.webContents.send(NOTIFICATION_SUBSCRIBE_ERROR, error);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    });
  } catch (error) {
    console.error(error);
  }
  return eventStream;
};

module.exports = registerNotificationSubscribe;
