const { ipcMain, shell } = require('electron');

const spaceClient = require('../space-client');

const EVENT_PREFIX = 'objects';
const FETCH_EVENT = `${EVENT_PREFIX}:fetch`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUCCESS_EVENT = `${EVENT_PREFIX}:success`;
const OPEN_EVENT = `${EVENT_PREFIX}:open`;

const listDirectories = async (mainWindow, payload = {}) => {
  try {
    const res = await spaceClient.listDirectories({
      bucket: 'personal',
      ...payload,
    });

    const entriesList = res.getEntriesList();

    const entries = entriesList.reduce((acc, entry) => [
      ...acc,
      {
        path: entry.getPath(),
        name: entry.getName(),
        isDir: entry.getIsdir(),
        created: entry.getCreated(),
        updated: entry.getUpdated(),
        ipfsHash: entry.getIpfshash(),
        sizeInBytes: entry.getSizeinbytes(),
        fileExtension: entry.getFileextension(),
      },
    ], []);

    mainWindow.webContents.send(SUCCESS_EVENT, { entries });
  } catch (err) {
    mainWindow.webContents.send(ERROR_EVENT, err);
  }
};

const registerObjectsEvents = (mainWindow) => {
  ipcMain.on(OPEN_EVENT, async (event, payload) => {
    try {
      const res = await spaceClient.openFile({
        path: payload,
        bucket: 'personal',
      });

      const location = res.getLocation();

      if (!location) {
        throw new Error('location not provided');
      }

      shell.openItem(location);
    } catch (err) {
      mainWindow.webContents.send(ERROR_EVENT, err);
    }
  });

  ipcMain.on(FETCH_EVENT, async (event, payload) => {
    await listDirectories(mainWindow, payload);
  });
};

module.exports = {
  default: registerObjectsEvents,
  listDirectories,
};
