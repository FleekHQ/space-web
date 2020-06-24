const { ipcMain } = require('electron');

const client = require('../client');

const EVENT_PREFIX = 'generateKeyPair';
const FORCE = 'WithForce';

const registerGenerateKeyPairEvents = (mainWindow) => {
  ipcMain.on(`${EVENT_PREFIX}:fetch`, (event, payload) => {
    client.GenerateKeyPair(payload, (err, res) => {
      if (err) {
        mainWindow.webContents.send(`${EVENT_PREFIX}:error`, err);
        return;
      }

      mainWindow.webContents.send(`${EVENT_PREFIX}:success`, res);
    });
  });

  ipcMain.on(`${EVENT_PREFIX}${FORCE}:fetch`, (event, payload) => {
    client.GenerateKeyPairWithForce(payload, (err, res) => {
      if (err) {
        mainWindow.webContents.send(`${EVENT_PREFIX}${FORCE}:error`, err);
        return;
      }

      mainWindow.webContents.send(`${EVENT_PREFIX}${FORCE}:success`, res);
    });
  });
};

module.exports = registerGenerateKeyPairEvents;
