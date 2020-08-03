const { ipcMain } = require('electron');

const { spaceClient } = require('../clients');

const EVENT_PREFIX = 'notifications';
const READ_NOTIFICATION_EVENT = `${EVENT_PREFIX}:readNotification`;
const READ_NOTIFICATION_ERROR_EVENT = `${EVENT_PREFIX}:readNotification:error`;
const READ_NOTIFICATION_SUCCESS_EVENT = `${EVENT_PREFIX}:readNotification:success`;
const FETCH_NOTIFICATIONS = `${EVENT_PREFIX}:fetch`;
const FETCH_NOTIFICATIONS_ERROR = `${EVENT_PREFIX}:fetch:error`;
const FETCH_NOTIFICATIONS_SUCCESS = `${EVENT_PREFIX}:fetch:success`;

const registerNotificationsEvents = (mainWindow) => {
  ipcMain.on(READ_NOTIFICATION_EVENT, async (event, payload) => {
    try {
      await spaceClient.readNotification(payload);

      mainWindow.webContents.send(READ_NOTIFICATION_SUCCESS_EVENT);
    } catch (err) {
      mainWindow.webContents.send(READ_NOTIFICATION_ERROR_EVENT, err);
    }
  });

  ipcMain.on(FETCH_NOTIFICATIONS, async (event, payload) => {
    try {
      const res = await spaceClient.getNotifications(payload);

      mainWindow.webContents.send(FETCH_NOTIFICATIONS_SUCCESS, {
        nextOffset: res.getNextoffset(),
        notifications: res.getNotificationsList().map((notification) => ({
          id: notification.getId(),
          subject: notification.getSubject(),
          body: notification.getBody(),
          type: notification.getType(),
          createdAt: notification.getCreatedat(),
          readAt: notification.getReadat(),
          relatedObject: notification.getRelatedobjectCase(),
        })),
      });
    } catch (err) {
      mainWindow.webContents.send(FETCH_NOTIFICATIONS_ERROR, err);
    }
  });
};

module.exports = registerNotificationsEvents;
