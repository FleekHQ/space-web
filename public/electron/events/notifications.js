const { ipcMain } = require('electron');

const { spaceClient } = require('../clients');

const EVENT_PREFIX = 'notifications';
const READ_NOTIFICATION_EVENT = `${EVENT_PREFIX}:readNotification`;
const READ_NOTIFICATION_ERROR_EVENT = `${EVENT_PREFIX}:readNotification:error`;
const READ_NOTIFICATION_SUCCESS_EVENT = `${EVENT_PREFIX}:readNotification:success`;
const FETCH_NOTIFICATIONS = `${EVENT_PREFIX}:fetch`;
const FETCH_NOTIFICATIONS_ERROR = `${EVENT_PREFIX}:fetch:error`;
const FETCH_NOTIFICATIONS_SUCCESS = `${EVENT_PREFIX}:fetch:success`;
const HANDLE_FILES_INVITATION = `${EVENT_PREFIX}:handleFilesInvitation`;
const HANDLE_FILES_INVITATION_SUCCESS = `${EVENT_PREFIX}:handleFilesInvitation:success`;
// const HANDLE_FILES_INVITATION_ERROR = `${EVENT_PREFIX}:handleFilesInvitation:error`;
const SET_NOTIFICATIONS_LAST_SEEN_AT = `${EVENT_PREFIX}:setNotificationsLastSeenAt`;
const SET_NOTIFICATIONS_LAST_SEEN_AT_SUCCESS = `${EVENT_PREFIX}:setNotificationsLastSeenAt:success`;
// const SET_NOTIFICATIONS_LAST_SEEN_AT_ERROR = `${EVENT_PREFIX}:setNotificationsLastSeenAt:error`;

const notificationsMocks = {
  lastSeenAt: 1598299960521,
  nextOffset: 1,
  notifications: [
    {
      id: '2',
      subject: 'anon',
      body: 'anon wants to share a file',
      type: 'INVITATION',
      relatedObject: {
        inviterPublicKey: '123',
        invitationId: '12',
        itemPaths: ['/item-path/item.pdf'],
        // status can also be `ACCEPTED` or `REJECTED`
        status: 'PENDING',
      },
      createdAt: 1598299960523,
      readAt: null,
    },
    {
      id: '1',
      subject: 'space',
      body: 'reaching backup limit',
      type: 'USAGEALERT',
      relatedObject: {
        used: 12300000000,
        limit: 12400000000,
        message: 'message',
      },
      createdAt: 1598299960523,
      readAt: null,
    },
    {
      id: '1',
      subject: 'space',
      body: 'reaching backup limit',
      type: 'USAGEALERT',
      relatedObject: {
        used: 12300000000,
        limit: 12400000000,
        message: 'message',
      },
      createdAt: 1598299960520,
      readAt: null,
    },
    {
      id: '1',
      subject: 'space',
      body: 'reaching backup limit',
      type: 'USAGEALERT',
      relatedObject: {
        used: 12300000000,
        limit: 12400000000,
        message: 'message',
      },
      createdAt: 1598299960520,
      readAt: null,
    },
    {
      id: '1',
      subject: 'space',
      body: 'reaching backup limit',
      type: 'USAGEALERT',
      relatedObject: {
        used: 12300000000,
        limit: 12400000000,
        message: 'message',
      },
      createdAt: 1598299960520,
      readAt: null,
    },
  ],
};

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
      // eslint-disable-next-line no-unused-vars
      const res = await spaceClient.getNotifications(payload);

      // mainWindow.webContents.send(FETCH_NOTIFICATIONS_SUCCESS, {
      //   nextOffset: res.getNextoffset(),
      //   notifications: res.getNotificationsList().map((notification) => ({
      //     id: notification.getId(),
      //     subject: notification.getSubject(),
      //     body: notification.getBody(),
      //     type: notification.getType(),
      //     createdAt: notification.getCreatedat(),
      //     readAt: notification.getReadat(),
      //     relatedObject: notification.getRelatedobjectCase(),
      //   })),
      // });
    } catch (err) {
      // TODO: remove the mocks
      mainWindow.webContents.send(FETCH_NOTIFICATIONS_SUCCESS, {
        ...notificationsMocks,
      });

      mainWindow.webContents.send(FETCH_NOTIFICATIONS_ERROR, err);
    }
  });

  ipcMain.on(HANDLE_FILES_INVITATION, async (event, payload) => {
    try {
      await spaceClient.handleFilesInvitation(payload);

      mainWindow.webContents.send(HANDLE_FILES_INVITATION_SUCCESS, payload);
    } catch (err) {
      mainWindow.webContents.send(HANDLE_FILES_INVITATION_SUCCESS, payload);
      // TODO: uncomment when integrated
      // mainWindow.webContents.send(HANDLE_FILES_INVITATION_ERROR, err);
    }
  });

  ipcMain.on(SET_NOTIFICATIONS_LAST_SEEN_AT, async (event, payload) => {
    try {
      await spaceClient.setNotificationsLastSeenAt(payload);

      mainWindow.webContents.send(SET_NOTIFICATIONS_LAST_SEEN_AT_SUCCESS, payload);
    } catch (err) {
      mainWindow.webContents.send(SET_NOTIFICATIONS_LAST_SEEN_AT_SUCCESS, payload);
      // TODO: uncomment when integrated
      // mainWindow.webContents.send(REJECT_FILES_INVITATION_ERROR, {
      //   ...payload,
      //   err,
      // });
    }
  });
};

module.exports = registerNotificationsEvents;
