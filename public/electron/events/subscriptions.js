// Subscriptions should occur upon initializtion of the app of a logged in user
const { ipcMain } = require('electron');

const registerNotificationNotificationSuscribe = require('./notifications-subscribe');
const registerEventStream = require('./stream');
const registerTxlSubscribe = require('./txl-subscribe');

const EVENT_PREFIX = 'subscriptions';
const SUBSCRIBE_EVENT = `${EVENT_PREFIX}:subscribe`;
const SUBSCRIBE_ERROR_EVENT = `${EVENT_PREFIX}:subscribe:error`;
const SUBSCRIBE_SUCCESS_EVENT = `${EVENT_PREFIX}:subscribe:success`;

/* eslint-disable no-console */
const registerSubscriptions = (mainWindow) => {
  ipcMain.on(SUBSCRIBE_EVENT, async () => {
    try {
      const stream = registerEventStream(mainWindow);
      const txlStream = registerTxlSubscribe(mainWindow);
      const notificationStream = registerNotificationNotificationSuscribe(mainWindow);

      // destroyStream called upon closing the electron app window in public/electron-app.js
      global.destroyStream = () => {
        stream.destroy();
        txlStream.destroy();
        notificationStream.destroy();
      };

      mainWindow.webContents.send(SUBSCRIBE_SUCCESS_EVENT);
    } catch (err) {
      console.error(SUBSCRIBE_ERROR_EVENT, err);
      mainWindow.webContents.send(SUBSCRIBE_ERROR_EVENT, err);
    }
  });
};

module.exports = registerSubscriptions;
