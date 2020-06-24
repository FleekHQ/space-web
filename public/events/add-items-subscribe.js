const { ipcMain } = require('electron');

const client = require('../client');
const { listDirectories } = require('./objects');

const EVENT_PREFIX = 'addItemsSubscribe';
const SUBSCRIBE_START_EVENT = `${EVENT_PREFIX}:start`;
const SUBSCRIBE_ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUBSCRIBE_SUCCESS_EVENT = `${EVENT_PREFIX}:success`;

const registerAddItemsSubscribe = (mainWindow) => {
  let eventStream;

  ipcMain.on(SUBSCRIBE_START_EVENT, (_, { id, payload }) => {
    eventStream = client.AddItems(payload);

    eventStream.on('data', (event) => {
      mainWindow.webContents.send(
        SUBSCRIBE_SUCCESS_EVENT,
        { id, payload: event },
      );
      listDirectories(mainWindow);
    });

    eventStream.on('error', (error) => {
      mainWindow.webContents.send(
        SUBSCRIBE_ERROR_EVENT,
        { id, payload: error },
      );
    });

    eventStream.on('end', () => {
      eventStream.destroy();
    });
  });
};

module.exports = registerAddItemsSubscribe;
