const { ipcMain } = require('electron');

const { spaceClient, apiClient } = require('../clients');

const EVENT_PREFIX = 'wallet';
const CLAIM_EVENT = `${EVENT_PREFIX}:claim`;
const CLAIM_ERROR_EVENT = `${EVENT_PREFIX}:claim:error`;
const CLAIM_SUCCESS_EVENT = `${EVENT_PREFIX}:claim:success`;

/* eslint-disable no-console */
const registerWalletEvents = (mainWindow) => {
  ipcMain.on(CLAIM_EVENT, async (payload) => {
    try {
      const apiTokens = await spaceClient.getAPISessionTokens();

      const { data } = await apiClient.wallet.claim({
        key: payload.key,
        token: apiTokens.getServicestoken(),
      });

      mainWindow.webContents.send(CLAIM_SUCCESS_EVENT, data);
    } catch (error) {
      console.error('CLAIM_ERROR_EVENT', error);
      mainWindow.webContents.send(CLAIM_ERROR_EVENT, {
        message: error.message,
      });
    }
  });
};

module.exports = registerWalletEvents;
