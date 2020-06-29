const { ipcMain } = require('electron');

const client = require('../client');

const EVENT_PREFIX = 'auth';
const SIGNUP_EVENT = `${EVENT_PREFIX}:signup`;
const SIGNUP_ERROR_EVENT = `${EVENT_PREFIX}:signup:error`;
const SIGNUP_SUCCESS_EVENT = `${EVENT_PREFIX}:signup:success`;
const CHECK_USERNAME_EVENT = `${EVENT_PREFIX}:check_username`;
const CHECK_USERNAME_ERROR_EVENT = `${EVENT_PREFIX}:check_username:error`;
const CHECK_USERNAME_SUCCESS_EVENT = `${EVENT_PREFIX}:check_username:success`;

const registerAuthEvents = (mainWindow) => {
  ipcMain.on(SIGNUP_EVENT, (event, payload) => {
    client.CreateUsernameAndEmail(payload, (err) => {
      if (err) {
        mainWindow.webContents.send(SIGNUP_ERROR_EVENT, err);
        return;
      }

      mainWindow.webContents.send(SIGNUP_SUCCESS_EVENT, payload);
    });
  });

  ipcMain.on(CHECK_USERNAME_EVENT, (event, payload) => {
    client.GetIdentityByUsername(payload, (err, res) => {
      if (err) {
        mainWindow.webContents.send(CHECK_USERNAME_ERROR_EVENT, err);
        return;
      }

      mainWindow.webContents.send(CHECK_USERNAME_SUCCESS_EVENT, res);
    });
  });
};

module.exports = registerAuthEvents;
