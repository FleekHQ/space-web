const { ipcMain } = require('electron');

const { spaceClient } = require('../clients');

const EVENT_PREFIX = 'account';
const DELETE_ACCOUNT_EVENT = `${EVENT_PREFIX}:delete`;
const DELETE_ACCOUNT_ERROR_EVENT = `${EVENT_PREFIX}:delete:error`;
const DELETE_ACCOUNT_SUCCESS_EVENT = `${EVENT_PREFIX}:delete:success`;

const registerAuthEvents = (mainWindow) => {
  ipcMain.on(DELETE_ACCOUNT_EVENT, async () => {
    try {
      await spaceClient.deleteAccount();

      mainWindow.webContents.send(DELETE_ACCOUNT_SUCCESS_EVENT, {});
    } catch (err) {
      mainWindow.webContents.send(DELETE_ACCOUNT_ERROR_EVENT, err);
    }
  });
};

module.exports = registerAuthEvents;
