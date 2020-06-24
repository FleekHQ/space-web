const { ipcMain, shell } = require('electron');

const client = require('../client');

const EVENT_PREFIX = 'objects';
const FETCH_EVENT = `${EVENT_PREFIX}:fetch`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUCCESS_EVENT = `${EVENT_PREFIX}:success`;
const OPEN_EVENT = `${EVENT_PREFIX}:open`;

const listDirectories = (mainWindow, payload) => client.ListDirectories(payload, (err, res) => {
  if (err) {
    mainWindow.webContents.send(ERROR_EVENT, err);
    return;
  }

  // TODO replace mock response by res
  mainWindow.webContents.send(SUCCESS_EVENT, res);
});

const registerObjectsEvents = (mainWindow) => {
  ipcMain.on(OPEN_EVENT, (event, payload) => {
    client.OpenFile({ path: payload }, (err, res) => {
      if (err) {
        return mainWindow.webContents.send(ERROR_EVENT, err);
      }

      if (!res.location) {
        return new Error('location not provided');
      }

      return shell.openItem(res.location);
    });
  });

  ipcMain.on(FETCH_EVENT, (event, payload) => {
    listDirectories(mainWindow, payload);
  });
};

module.exports = {
  default: registerObjectsEvents,
  listDirectories,
};
