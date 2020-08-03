const { ipcMain } = require('electron');

const { spaceClient } = require('../clients');

const EVENT_PREFIX = 'notifications';
const FETCH_NOTIFICATIONS = `${EVENT_PREFIX}:fetch`;
const FETCH_NOTIFICATIONS_ERROR = `${EVENT_PREFIX}:fetch:error`;
const FETCH_NOTIFICATIONS_SUCCESS = `${EVENT_PREFIX}:fetch:success`;

const registerNotificationEvents = (mainWindow) => {
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

module.exports = registerNotificationEvents;
