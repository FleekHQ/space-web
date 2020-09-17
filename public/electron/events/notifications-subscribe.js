const { spaceClient } = require('../clients');
const { mapNotification } = require('../utils');
const { listDirectories } = require('./objects');

const NOTIFICATION_SUBSCRIBE_SUCCESS = 'notificationSubscribe:success';
const NOTIFICATION_SUBSCRIBE_ERROR = 'notificationSubscribe:error';
const INVITATION_REPLY = 'INVITATION_REPLY';

const registerNotificationSubscribe = (mainWindow) => {
  const eventStream = spaceClient.notificationSubscribe();

  eventStream.on('data', async (data) => {
    const notification = data.getNotification();

    const mappedNotification = mapNotification(notification);

    mainWindow.webContents.send(NOTIFICATION_SUBSCRIBE_SUCCESS, mappedNotification);

    if (mappedNotification.type === INVITATION_REPLY) {
      await listDirectories(mainWindow);
    }
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
