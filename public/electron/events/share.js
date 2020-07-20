const { ipcMain } = require('electron');

const spaceClient = require('../space-client');

const EVENT_PREFIX = 'share';
const GENERATE_LINK_EVENT = `${EVENT_PREFIX}:generateLink`;
const GENERATE_LINK_ERROR_EVENT = `${EVENT_PREFIX}:generateLink:error`;
const GENERATE_LINK_SUCCESS_EVENT = `${EVENT_PREFIX}:generateLink:success`;

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
};

module.exports = registerShareEvents;
