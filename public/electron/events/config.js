const { ipcMain } = require('electron');

const client = require('../client');

const EVENT_PREFIX = 'configInfo';
const FETCH_EVENT = `${EVENT_PREFIX}:fetch`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUCCESS_EVENT = `${EVENT_PREFIX}:success`;

const registerConfigEvents = (mainWindow) => {
  ipcMain.on(FETCH_EVENT, (event, payload) => {
    client.GetConfigInfo(payload, (err, res) => {
      if (err) {
        mainWindow.webContents.send(ERROR_EVENT, err);
        return;
      }

      mainWindow.webContents.send(SUCCESS_EVENT, res);
    });
  });
};

module.exports = registerConfigEvents;
