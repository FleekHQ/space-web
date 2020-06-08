const { ipcMain } = require('electron');

const client = require('../client');
const { listDirectories } = require('./objects');

const EVENT_PREFIX = 'upload';
const START_EVENT = `${EVENT_PREFIX}:start`;
const SUCCESS_EVENT = `${EVENT_PREFIX}:success`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;

const registerAddItemsEvents = (mainWindow) => {
  ipcMain.on(START_EVENT, (event, payload) => {
    client.AddItems(payload, (err, res) => {
      if (err) {
        mainWindow.webContents.send(ERROR_EVENT, {
          message: err.message,
        });
        return;
      }

      listDirectories(mainWindow);
      mainWindow.webContents.send(SUCCESS_EVENT, res);
    });
  });
};

module.exports = registerAddItemsEvents;
