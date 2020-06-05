const { ipcMain } = require('electron');

const client = require('../client');

const EVENT_PREFIX = 'upload';
const START_EVENT = `${EVENT_PREFIX}:start`;
const SUCCESS_EVENT = `${EVENT_PREFIX}:success`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;

const registerUploadEvents = (mainWindow) => {
  ipcMain.on(START_EVENT, (event, payload) => {
    client.AddFile(payload, (err, res) => {
      if (err) {
        mainWindow.webContents.send(ERROR_EVENT, err);
        return;
      }

      mainWindow.webContents.send(SUCCESS_EVENT, res);
    });
  });
};

module.exports = registerUploadEvents;
