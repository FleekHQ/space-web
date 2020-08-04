const { ipcMain } = require('electron');

const { spaceClient } = require('../clients');

const EVENT_PREFIX = 'keys';
const GET_PUBLIC_KEY_EVENT = `${EVENT_PREFIX}:publicKey`;
const GET_PUBLIC_KEY_ERROR_EVENT = `${EVENT_PREFIX}:publicKey:error`;
const GET_PUBLIC_KEY_SUCCESS_EVENT = `${EVENT_PREFIX}:publicKey:success`;
const DELETE_KEY_PAIR = `${EVENT_PREFIX}:delete`;
const DELETE_KEY_PAIR_SUCCESS = `${EVENT_PREFIX}:delete:success`;
const DELETE_KEY_PAIR_ERROR = `${EVENT_PREFIX}:delete:error`;

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

  ipcMain.on(DELETE_KEY_PAIR, async () => {
    try {
      await spaceClient.deleteKeyPair();

      mainWindow.webContents.send(DELETE_KEY_PAIR_SUCCESS);
    } catch (err) {
      mainWindow.webContents.send(DELETE_KEY_PAIR_ERROR, err);
    }
  });
};

module.exports = registerAuthEvents;
