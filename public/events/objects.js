const { ipcMain, shell } = require('electron');

const client = require('../client');

const EVENT_PREFIX = 'objects';
const FETCH_EVENT = `${EVENT_PREFIX}:fetch`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUCCESS_EVENT = `${EVENT_PREFIX}:success`;
const OPEN_EVENT = `${EVENT_PREFIX}:open`;

const registerObjectsEvents = (mainWindow) => {
  ipcMain.on(OPEN_EVENT, (event, payload) => {
    shell.openItem(payload);
  });

  ipcMain.on(FETCH_EVENT, (event, payload) => {
    client.ListDirectories(payload, (err, res) => {
      if (err) {
        return mainWindow.webContents.send(ERROR_EVENT, err);
      }

      mainWindow.webContents.send(SUCCESS_EVENT, res);
    });
  });
};

module.exports = registerObjectsEvents;
