const { ipcMain, shell } = require('electron');

const spaceClient = require('../space-client');

const EVENT_PREFIX = 'objects';
const OPEN_EVENT = `${EVENT_PREFIX}:open`;
const FETCH_EVENT = `${EVENT_PREFIX}:fetch`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUCCESS_EVENT = `${EVENT_PREFIX}:success`;
const FETCH_DIR_EVENT = `${EVENT_PREFIX}:fetchDir`;
const SUCCESS_DIR_EVENT = `${EVENT_PREFIX}:successDir`;

const entryToObject = (entry) => ({
  path: entry.getPath(),
  name: entry.getName(),
  isDir: entry.getIsdir(),
  created: entry.getCreated(),
  updated: entry.getUpdated(),
  ipfsHash: entry.getIpfshash(),
  sizeInBytes: entry.getSizeinbytes(),
  fileExtension: entry.getFileextension(),
});

const listDirectories = async (mainWindow, payload = {}) => {
  try {
    const res = await spaceClient.listDirectories(payload);

    const entriesList = res.getEntriesList();
    const entries = entriesList.map(entryToObject);

    mainWindow.webContents.send(SUCCESS_EVENT, { entries });
  } catch (err) {
    mainWindow.webContents.send(ERROR_EVENT, err);
  }
};

const listDirectory = async (
  mainWindow,
  payload = { path: '', fetchSubFolders: true },
) => {
  try {
    const res = await spaceClient.listDirectory(payload);
    const entries = res.getEntriesList().map(entryToObject);

    mainWindow.webContents.send(SUCCESS_DIR_EVENT, { entries });

    // fetch sub-folders
    if (payload.fetchSubFolders) {
      const subDirs = entries.filter((entry) => entry.isDir);

      subDirs.forEach(async (dir) => {
        await listDirectory(
          mainWindow,
          { ...payload, path: dir.path, fetchSubFolders: false },
        );
      });
    }
  } catch (error) {
    mainWindow.webContents.send(ERROR_EVENT, error);
  }
};

const registerObjectsEvents = (mainWindow) => {
  ipcMain.on(OPEN_EVENT, async (event, payload) => {
    try {
      const res = await spaceClient.openFile(payload);

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

  ipcMain.on(FETCH_DIR_EVENT, async (event, payload) => {
    await listDirectory(mainWindow, payload);
  });
};

module.exports = {
  default: registerObjectsEvents,
  listDirectories,
  listDirectory,
};
