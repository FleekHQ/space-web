const { ipcMain } = require('electron');

const { spaceClient } = require('../clients');

const EVENT_PREFIX = 'share';
const GENERATE_LINK_EVENT = `${EVENT_PREFIX}:generateLink`;
const GENERATE_LINK_ERROR_EVENT = `${EVENT_PREFIX}:generateLink:error`;
const GENERATE_LINK_SUCCESS_EVENT = `${EVENT_PREFIX}:generateLink:success`;
const SHARE_ITEMS_EVENT = `${EVENT_PREFIX}:items`;
const SHARE_ITEMS_ERROR_EVENT = `${EVENT_PREFIX}:itemsError`;
const SHARE_ITEMS_SUCCESS_EVENT = `${EVENT_PREFIX}:itemsSuccess`;

const registerShareEvents = (mainWindow) => {
  ipcMain.on(GENERATE_LINK_EVENT, async (event, payload) => {
    try {
      const res = await spaceClient.generateFileShareLink(payload);
      mainWindow.webContents.send(GENERATE_LINK_SUCCESS_EVENT, {
        link: res.getLink(),
      });
    } catch (err) {
      mainWindow.webContents.send(GENERATE_LINK_ERROR_EVENT, err);
    }
  });

  ipcMain.on(SHARE_ITEMS_EVENT, async (event, payload) => {
    try {
      await spaceClient.shareItemsToSelectGroup(payload);
      mainWindow.webContents.send(SHARE_ITEMS_SUCCESS_EVENT);
    } catch (err) {
      mainWindow.webContents.send(SHARE_ITEMS_ERROR_EVENT, err);
    }
  });
};

module.exports = registerShareEvents;
