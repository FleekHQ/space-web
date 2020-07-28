const { ipcMain } = require('electron');

const { spaceClient } = require('../clients');

const EVENT_PREFIX = 'keys';
const GET_PUBLIC_KEY_EVENT = `${EVENT_PREFIX}:publicKey`;
const GET_PUBLIC_KEY_ERROR_EVENT = `${EVENT_PREFIX}:publicKey:error`;
const GET_PUBLIC_KEY_SUCCESS_EVENT = `${EVENT_PREFIX}:publicKey:success`;

const registerAuthEvents = (mainWindow) => {
  ipcMain.on(GET_PUBLIC_KEY_EVENT, async () => {
    try {
      const res = await spaceClient.getPublicKey();

      mainWindow.webContents.send(GET_PUBLIC_KEY_SUCCESS_EVENT, {
        publicKey: res.getPublickey(),
      });
    } catch (err) {
      mainWindow.webContents.send(GET_PUBLIC_KEY_ERROR_EVENT, err);
    }
  });
};

module.exports = registerAuthEvents;
