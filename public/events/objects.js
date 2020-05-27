const { ipcMain } = require('electron');

const EVENT_PREFIX = 'objects';
const FETCH_EVENT = `${EVENT_PREFIX}:fetch`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUCCESS_EVENT = `${EVENT_PREFIX}:success`;

const registerObjectsEvents = (mainWindow) => {
  ipcMain.on(FETCH_EVENT, (event, payload) => {
    // TODO replace by list directory
    const result = [
      {
        fullKey: 'some value',
      },
    ];

    mainWindow.webContents.send(SUCCESS_EVENT, result);
  });
};

module.exports = registerObjectsEvents;
