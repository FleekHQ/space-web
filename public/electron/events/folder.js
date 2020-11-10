const { ipcMain } = require('electron');
const pickBy = require('lodash/pickBy');
const identity = require('lodash/identity');

const { spaceClient } = require('../clients');
const { listDirectory } = require('./objects');

const EVENT_PREFIX = 'folder';
const CREATE_FOLDER_EVENT = `${EVENT_PREFIX}:folder`;
const CREATE_FOLDER_ERROR_EVENT = `${EVENT_PREFIX}:folder:error`;
const CREATE_FOLDER_SUCCESS_EVENT = `${EVENT_PREFIX}:folder:success`;

/* eslint-disable no-console */
const registerFolderEvents = (mainWindow) => {
  ipcMain.on(CREATE_FOLDER_EVENT, async (_, payload) => {
    try {
      const {
        path,
        folderName,
        bucket = 'personal',
      } = payload;
      const folderPath = path.length === 0 ? folderName : `${path}/${folderName}`;

      const createFolderPayload = pickBy({
        bucket,
        path: folderPath,
      }, identity);

      await spaceClient.createFolder(createFolderPayload);

      mainWindow.webContents.send(CREATE_FOLDER_SUCCESS_EVENT, {
        bucket,
        isDir: true,
        ipfsHash: '',
        sizeInBytes: 0,
        backupCount: 0,
        path: folderPath,
        name: folderName,
        fileExtension: '',
        isLocallyAvailable: false,
        created: (new Date()).toISOString(),
        updated: (new Date()).toISOString(),
      });

      const listDirPayload = {
        path,
        fetchSubFolders: false,
      };

      if (bucket) {
        listDirPayload.bucket = bucket;
      }

      await listDirectory(mainWindow, listDirPayload);
    } catch (err) {
      console.error('CREATE_FOLDER_ERROR_EVENT', err);

      mainWindow.webContents.send(CREATE_FOLDER_ERROR_EVENT, err);
    }
  });
};

module.exports = registerFolderEvents;
