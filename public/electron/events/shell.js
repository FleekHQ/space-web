const { shell } = require('electron');
const { ipcMain } = require('electron');

const EVENT_PREFIX = 'shell';
const OPEN_EXTERNAL_LINK_EVENT = `${EVENT_PREFIX}:openExternalLink`;

const registerShellEvents = () => {
  ipcMain.on(OPEN_EXTERNAL_LINK_EVENT, async (event, payload) => {
    try {
      shell.openExternal(payload);
    } catch (error) {
      /* eslint-disable no-console */
      console.error('OPEN_EXTERNAL_LINK_EVENT', error);
    }
  });
};

module.exports = registerShellEvents;
