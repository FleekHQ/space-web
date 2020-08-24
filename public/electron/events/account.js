const fs = require('fs');
const get = require('lodash/get');
const { ipcMain } = require('electron');

const { spaceClient, apiClient } = require('../clients');

const EVENT_PREFIX = 'account';
const DELETE_ACCOUNT_EVENT = `${EVENT_PREFIX}:delete`;
const DELETE_ACCOUNT_ERROR_EVENT = `${EVENT_PREFIX}:delete:error`;
const DELETE_ACCOUNT_SUCCESS_EVENT = `${EVENT_PREFIX}:delete:success`;
const UPDATE_IDENTITY_EVENT = `${EVENT_PREFIX}:identity:update`;
const UPDATE_IDENTITY_ERROR_EVENT = `${UPDATE_IDENTITY_EVENT}:error`;
const UPDATE_IDENTITY_SUCCESS_EVENT = `${UPDATE_IDENTITY_EVENT}:success`;
const UPLOAD_PROFILE_PIC_EVENT = `${EVENT_PREFIX}:identity:uploadProfilePic`;
const UPLOAD_PROFILE_PIC_ERROR_EVENT = `${UPLOAD_PROFILE_PIC_EVENT}:error`;
const UPLOAD_PROFILE_PIC_SUCCESS_EVENT = `${UPLOAD_PROFILE_PIC_EVENT}:success`;

const registerAuthEvents = (mainWindow) => {
  ipcMain.on(DELETE_ACCOUNT_EVENT, async () => {
    try {
      await spaceClient.deleteAccount();

      mainWindow.webContents.send(DELETE_ACCOUNT_SUCCESS_EVENT, {});
    } catch (err) {
      mainWindow.webContents.send(DELETE_ACCOUNT_ERROR_EVENT, err);
    }
  });

  ipcMain.on(UPDATE_IDENTITY_EVENT, async (event, payload) => {
    try {
      const apiTokens = await spaceClient.getAPISessionTokens();

      const { data } = await apiClient.identity.update({
        ...payload,
        token: apiTokens.getServicestoken(),
      });

      mainWindow.webContents.send(UPDATE_IDENTITY_SUCCESS_EVENT, data);
    } catch (error) {
      let message = error.message || error.toString();

      const statusCode = get(error, 'response.status');

      if (statusCode === 409) {
        message = error.response.data.error;
      }

      mainWindow.webContents.send(UPDATE_IDENTITY_ERROR_EVENT, {
        message,
      });
    }
  });

  ipcMain.on(UPLOAD_PROFILE_PIC_EVENT, async (event, payload) => {
    const { imagePath } = payload;
    try {
      const apiTokens = await spaceClient.getAPISessionTokens();

      const base64Image = fs.readFileSync(imagePath).toString('base64');

      const { data } = await apiClient.identity.uploadProfilePic({
        base64Image,
        token: apiTokens.getServicestoken(),
      });

      mainWindow.webContents.send(UPLOAD_PROFILE_PIC_SUCCESS_EVENT, data);
    } catch (error) {
      let message = error.message || error.toString();

      const statusCode = get(error, 'response.status');

      if (statusCode === 409) {
        message = error.response.data.error;
      }

      mainWindow.webContents.send(UPLOAD_PROFILE_PIC_ERROR_EVENT, {
        message,
      });
    }
  });
};

module.exports = registerAuthEvents;
