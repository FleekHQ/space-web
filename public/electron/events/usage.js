const { ipcMain } = require('electron');

const { spaceClient } = require('../clients');

const EVENT_PREFIX = 'usage';
const FETCH_USAGE_EVENT = `${EVENT_PREFIX}:fetch`;
// eslint-disable-next-line no-unused-vars
const FETCH_USAGE_ERROR_EVENT = `${EVENT_PREFIX}:fetch:error`;
const FETCH_USAGE_SUCCESS_EVENT = `${EVENT_PREFIX}:fetch:success`;

const mockupResponse = (mainWindow) => {
  setTimeout(() => {
    mainWindow.webContents.send(FETCH_USAGE_SUCCESS_EVENT, {
      localStorageUsed: 42532,
      localBandwidthUsed: 86678,
      spaceStorageUsed: 99231,
      spaceBandwidthUsed: 68683,
      usageQuota: 87456983,
    });
  }, 5000);
};

const registerUsageEvents = (mainWindow) => {
  ipcMain.on(FETCH_USAGE_EVENT, async (event, payload) => {
    try {
      const res = await spaceClient.getUsageInfo(payload);
      mainWindow.webContents.send(FETCH_USAGE_SUCCESS_EVENT, res);
    } catch (error) {
      // mainWindow.webContents.send(FETCH_USAGE_ERROR_EVENT, error);
      mockupResponse(mainWindow);
    }
  });
};

module.exports = registerUsageEvents;
