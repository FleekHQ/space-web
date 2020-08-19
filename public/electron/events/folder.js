const { ipcMain } = require('electron');

const { spaceClient } = require('../clients');
const { listDirectory } = require('./objects');

const EVENT_PREFIX = 'folder';
const CREATE_FOLDER_EVENT = `${EVENT_PREFIX}:folder`;
const CREATE_FOLDER_ERROR_EVENT = `${EVENT_PREFIX}:folder:error`;
const CREATE_FOLDER_SUCCESS_EVENT = `${EVENT_PREFIX}:folder:success`;

const registerFolderEvents = (mainWindow) => {
  ipcMain.on(CREATE_FOLDER_EVENT, async (_, payload) => {
    try {
      await spaceClient.createFolder(payload);
      mainWindow.webContents.send(CREATE_FOLDER_SUCCESS_EVENT, {});

      const listDirPayload = {
        path: payload.path,
        fetchSubFolders: false,
      };

      if (payload.bucket) {
        listDirPayload.bucket = payload.bucket;
      }

      await listDirectory(mainWindow, listDirPayload);
    } catch (err) {
      mainWindow.webContents.send(CREATE_FOLDER_ERROR_EVENT, err);
    }
  });
};

module.exports = registerFolderEvents;
