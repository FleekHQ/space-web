const { ipcMain, shell } = require('electron');
const get = require('lodash/get');

const { spaceClient } = require('../clients');

const EVENT_PREFIX = 'objects';
const OPEN_EVENT = `${EVENT_PREFIX}:open`;
const OPEN_ERROR_EVENT = `${EVENT_PREFIX}:open:error`;
const FETCH_EVENT = `${EVENT_PREFIX}:fetch`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUCCESS_EVENT = `${EVENT_PREFIX}:success`;
const FETCH_DIR_EVENT = `${EVENT_PREFIX}:fetchDir`;
const SUCCESS_DIR_EVENT = `${EVENT_PREFIX}:successDir`;
const FETCH_SHARED_OBJECTS_EVENT = `${EVENT_PREFIX}:fetchShared`;
const FETCH_SHARED_OBJECTS_ERROR_EVENT = `${EVENT_PREFIX}:fetchShared:error`;
const FETCH_SHARED_OBJECTS_SUCCESS_EVENT = `${EVENT_PREFIX}:fetchShared:success`;
const OPEN_PUBLIC_FILE_EVENT = `${EVENT_PREFIX}:openPublicFile`;
const OPEN_PUBLIC_FILE_ERROR_EVENT = `${EVENT_PREFIX}:openPublicFile:error`;
const OPEN_PUBLIC_FILE_SUCCESS_EVENT = `${EVENT_PREFIX}:openPublicFile:success`;
const SEARCH_EVENT = `${EVENT_PREFIX}:search`;
const SEARCH_ERROR_EVENT = `${SEARCH_EVENT}:error`;
const SEARCH_SUCCESS_EVENT = `${SEARCH_EVENT}:success`;

const DEFAULT_BUCKET = 'personal';

const entryToObject = (entry, bucket) => ({
  bucket,
  path: entry.getPath(),
  name: entry.getName(),
  isDir: entry.getIsdir(),
  created: entry.getCreated(),
  updated: entry.getUpdated(),
  ipfsHash: entry.getIpfshash(),
  sizeInBytes: entry.getSizeinbytes(),
  backupCount: entry.getBackupcount(),
  fileExtension: entry.getFileextension(),
  isLocallyAvailable: entry.getIslocallyavailable(),
  members: entry.getMembersList().map((member) => ({
    address: member.getAddress(),
    publicKey: member.getPublickey(),
  })),
});

/* eslint-disable no-console */
const listDirectories = async (mainWindow, payload = {}) => {
  const bucket = get(payload, 'bucket', DEFAULT_BUCKET) || DEFAULT_BUCKET;

  try {
    const res = await spaceClient.listDirectories(payload);

    const entriesList = res.getEntriesList();
    const entries = entriesList.map((entry) => entryToObject(entry, bucket));

    mainWindow.webContents.send(SUCCESS_EVENT, { entries, bucket });
  } catch (err) {
    console.error(`${ERROR_EVENT}-listDirectories`, err);
    mainWindow.webContents.send(ERROR_EVENT, err);
  }
};

const listSharedFiles = async (mainWindow, payload = {}) => {
  try {
    const withMeRes = await spaceClient.getSharedWithMeFiles({
      seek: '',
      limit: 100,
      ...payload,
    });
    const byMeRes = await spaceClient.getSharedByMeFiles({
      seek: '',
      limit: 100,
      ...payload,
    }).catch((error) => {
      console.error('FETCH_SHARED_BY_ME_FILES', error);
      return {
        getNextoffset() {
          return '';
        },
        getItemsList() {
          return [];
        },
      };
    });

    const byMeItems = byMeRes.getItemsList().map((item) => {
      const entry = item.getEntry();

      return {
        dbId: item.getDbid(),
        sourceBucket: item.getBucket(),
        isPublicLink: item.getIspubliclink(),
        ...entryToObject(entry, 'shared-with-me'),
      };
    });

    const withMeItems = withMeRes.getItemsList().map((item) => {
      const entry = item.getEntry();

      return {
        dbId: item.getDbid(),
        sourceBucket: item.getBucket(),
        isPublicLink: item.getIspubliclink(),
        ...entryToObject(entry, 'shared-with-me'),
      };
    });

    const objects = {
      nextOffset: withMeRes.getNextoffset(),
      nextOffsetByMe: byMeRes.getNextoffset(),
      items: [...withMeItems, ...byMeItems],
    };

    mainWindow.webContents.send(FETCH_SHARED_OBJECTS_SUCCESS_EVENT, {
      objects,
      bucket: 'shared-with-me',
    });
  } catch (error) {
    console.error('FETCH_SHARED_OBJECTS_ERROR_EVENT', error);
    mainWindow.webContents.send(FETCH_SHARED_OBJECTS_ERROR_EVENT, { error, bucket: 'shared-with-me' });
  }
};

const listDirectory = async (
  mainWindow,
  payload = { path: '', fetchSubFolders: true },
) => {
  const bucket = get(payload, 'bucket', DEFAULT_BUCKET) || DEFAULT_BUCKET;

  try {
    const res = await spaceClient.listDirectory(payload);
    const entries = res.getEntriesList().map((entry) => entryToObject(entry, bucket));

    mainWindow.webContents.send(SUCCESS_DIR_EVENT, { entries, bucket });

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
    console.error(`${ERROR_EVENT}-listDirectory`, error);
    mainWindow.webContents.send(ERROR_EVENT, { error, bucket });
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
      console.error('OPEN_ERROR_EVENT', err);
      mainWindow.webContents.send(OPEN_ERROR_EVENT, payload);
    }
  });

  ipcMain.on(OPEN_PUBLIC_FILE_EVENT, async (event, payload) => {
    try {
      const openPublicFilePayload = {
        fileCid: payload.fileCid,
        filename: payload.filename,
      };

      if (payload.password) {
        openPublicFilePayload.password = payload.password;
      }
      const res = await spaceClient.openPublicFile(openPublicFilePayload);

      const location = res.getLocation();

      if (!location) {
        throw new Error('location not provided');
      }

      if (payload.reloadFiles) {
        await listSharedFiles(mainWindow);
      }

      mainWindow.webContents.send(OPEN_PUBLIC_FILE_SUCCESS_EVENT, { location });
      shell.openItem(location);
    } catch (err) {
      console.error('OPEN_PUBLIC_FILE_ERROR_EVENT', err);
      mainWindow.webContents.send(OPEN_PUBLIC_FILE_ERROR_EVENT, {
        message: err.message,
      });
    }
  });

  ipcMain.on(FETCH_EVENT, async (event, payload) => {
    await listDirectories(mainWindow, payload);
  });

  ipcMain.on(FETCH_DIR_EVENT, async (event, payload) => {
    await listDirectory(mainWindow, payload);
  });

  ipcMain.on(FETCH_SHARED_OBJECTS_EVENT, async (event, payload = {}) => {
    await listSharedFiles(mainWindow, payload);
  });

  ipcMain.on(SEARCH_EVENT, async (event, payload) => {
    try {
      const res = await spaceClient.searchFiles({ query: payload });

      const entries = res.getEntriesList().map((item) => {
        const dbId = item.getDbid();
        const entry = item.getEntry();
        const sourceBucket = item.getBucket();
        const bucket = sourceBucket === 'personal' ? 'personal' : 'shared-with-me';

        return {
          sourceBucket,
          ...entryToObject(entry, bucket),
          ...(bucket !== 'personal' && { dbId }),
        };
      });

      mainWindow.webContents.send(SEARCH_SUCCESS_EVENT, { entries });
    } catch (err) {
      console.error('SEARCH_ERROR_EVENT', err);
      mainWindow.webContents.send(SEARCH_ERROR_EVENT, {
        message: err.message,
      });
    }
  });
};

module.exports = {
  default: registerObjectsEvents,
  listDirectories,
  listDirectory,
  listSharedFiles,
  entryToObject,
};
