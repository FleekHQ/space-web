const { ipcMain } = require('electron');

const { spaceClient } = require('../clients');
const { mapNotification } = require('../utils');
const { listSharedFiles } = require('./objects');

const EVENT_PREFIX = 'notifications';
const READ_NOTIFICATION_EVENT = `${EVENT_PREFIX}:readNotification`;
const READ_NOTIFICATION_ERROR_EVENT = `${EVENT_PREFIX}:readNotification:error`;
const READ_NOTIFICATION_SUCCESS_EVENT = `${EVENT_PREFIX}:readNotification:success`;
const FETCH_NOTIFICATIONS = `${EVENT_PREFIX}:fetch`;
const FETCH_NOTIFICATIONS_ERROR = `${EVENT_PREFIX}:fetch:error`;
const FETCH_NOTIFICATIONS_SUCCESS = `${EVENT_PREFIX}:fetch:success`;
const HANDLE_FILES_INVITATION = `${EVENT_PREFIX}:handleFilesInvitation`;
const HANDLE_FILES_INVITATION_SUCCESS = `${EVENT_PREFIX}:handleFilesInvitation:success`;
const HANDLE_FILES_INVITATION_ERROR = `${EVENT_PREFIX}:handleFilesInvitation:error`;
const SET_NOTIFICATIONS_LAST_SEEN_AT = `${EVENT_PREFIX}:setNotificationsLastSeenAt`;
const SET_NOTIFICATIONS_LAST_SEEN_AT_SUCCESS = `${EVENT_PREFIX}:setNotificationsLastSeenAt:success`;
const SET_NOTIFICATIONS_LAST_SEEN_AT_ERROR = `${EVENT_PREFIX}:setNotificationsLastSeenAt:error`;

/* eslint-disable no-console */
const fetchNotifications = async (mainWindow, payload = {}) => {
  try {
    const res = await spaceClient.getNotifications(payload);

    mainWindow.webContents.send(FETCH_NOTIFICATIONS_SUCCESS, {
      nextOffset: res.getNextoffset(),
      lastSeenAt: res.getLastseenat(),
      notifications: res.getNotificationsList().map(
        (notification) => mapNotification(notification),
      ),
    });
  } catch (err) {
    console.error('FETCH_NOTIFICATIONS_ERROR', err);
    mainWindow.webContents.send(FETCH_NOTIFICATIONS_ERROR, err);
  }
};

const registerNotificationsEvents = (mainWindow) => {
  ipcMain.on(READ_NOTIFICATION_EVENT, async (event, payload) => {
    try {
      await spaceClient.readNotification(payload);

      mainWindow.webContents.send(READ_NOTIFICATION_SUCCESS_EVENT);
    } catch (err) {
      console.error('READ_NOTIFICATION_ERROR_EVENT', err);
      mainWindow.webContents.send(READ_NOTIFICATION_ERROR_EVENT, err);
    }
  });

  ipcMain.on(FETCH_NOTIFICATIONS, async (event, payload) => {
    await fetchNotifications(mainWindow, payload);
  });

  ipcMain.on(HANDLE_FILES_INVITATION, async (event, payload) => {
    try {
      await spaceClient.handleFilesInvitation(payload);
      await listSharedFiles(mainWindow);

      mainWindow.webContents.send(HANDLE_FILES_INVITATION_SUCCESS, payload);
    } catch (err) {
      console.error('HANDLE_FILES_INVITATION_ERROR', err);
      mainWindow.webContents.send(HANDLE_FILES_INVITATION_ERROR, payload, err);
    } finally {
      await fetchNotifications(mainWindow, { limit: 10, seek: 0 });
    }
  });

  ipcMain.on(SET_NOTIFICATIONS_LAST_SEEN_AT, async (event, payload) => {
    try {
      await spaceClient.setNotificationsLastSeenAt(payload);

      mainWindow.webContents.send(SET_NOTIFICATIONS_LAST_SEEN_AT_SUCCESS, payload);
    } catch (err) {
      console.error('SET_NOTIFICATIONS_LAST_SEEN_AT_ERROR', err);
      mainWindow.webContents.send(SET_NOTIFICATIONS_LAST_SEEN_AT_ERROR, {
        ...payload,
        err,
      });
    }
  });
};

module.exports = registerNotificationsEvents;
