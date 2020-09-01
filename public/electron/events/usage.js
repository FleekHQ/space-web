const { ipcMain } = require('electron');

const { spaceClient } = require('../clients');

const EVENT_PREFIX = 'usage';
const FETCH_USAGE_EVENT = `${EVENT_PREFIX}:fetch`;
const FETCH_USAGE_ERROR_EVENT = `${EVENT_PREFIX}:fetch:error`;
// eslint-disable-next-line no-unused-vars
const FETCH_USAGE_SUCCESS_EVENT = `${EVENT_PREFIX}:fetch:success`;

const mockupResponse = (mainWindow) => {
  mainWindow.webContents.send(FETCH_USAGE_ERROR_EVENT, {
    localStorageUsed: 42532,
    localBandwidthUsed: 86678,
    spaceStorageUsed: 9231,
    spaceBandwidthUsed: 263,
    usageQuota: 87456983,
  });
};

const registerUsageEvents = (mainWindow) => {
  ipcMain.on(FETCH_USAGE_EVENT, async (event, payload) => {
    try {
      const res = await spaceClient.getUsageInfo(payload);
      mainWindow.webContents.send(FETCH_USAGE_ERROR_EVENT, res);
    } catch (error) {
      // mainWindow.webContents.send(FETCH_USAGE_SUCCESS_EVENT, error);
      mockupResponse();
    }
  });
};

module.exports = registerUsageEvents;
