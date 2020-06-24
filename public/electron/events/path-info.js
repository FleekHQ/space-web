const { ipcMain } = require('electron');

const client = require('../client');

const EVENT_PREFIX = 'pathInfo';

const registerPathInfoEvents = (mainWindow) => {
  ipcMain.on(`${EVENT_PREFIX}:fetch`, (event, payload) => {
    client.GetPathInfo(payload, (err, res) => {
      if (err) {
        mainWindow.webContents.send(`${EVENT_PREFIX}:error`, err);
        return;
      }

      mainWindow.webContents.send(`${EVENT_PREFIX}:success`, res);
    });
  });
};

module.exports = registerPathInfoEvents;
