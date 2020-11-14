const { ipcMain } = require('electron');

const { spaceClient } = require('../clients');
const { listDirectory } = require('./objects');

const EVENT_PREFIX = 'bucket';
const LIST_FETCH_EVENT = `${EVENT_PREFIX}:list:fetch`;
const LIST_ERROR_EVENT = `${EVENT_PREFIX}:list:error`;
const LIST_SUCCESS_EVENT = `${EVENT_PREFIX}:list:success`;
const TOGGLE_BUCKET_BACKUP_EVENT = `${EVENT_PREFIX}:toggle_backup`;
const TOGGLE_BUCKET_BACKUP_SUCCESS_EVENT = `${EVENT_PREFIX}:toggle_backup:success`;
const TOGGLE_BUCKET_BACKUP_ERROR_EVENT = `${EVENT_PREFIX}:toggle_backup:error`;

const getBucketData = (bucket) => ({
  key: bucket.getKey(),
  name: bucket.getName(),
  path: bucket.getPath(),
  createdAt: bucket.getCreatedat(),
  updatedAt: bucket.getUpdatedat(),
  membersList: bucket.getMembersList(),
  isSelectGroupBucket: bucket.getIsselectgroupbucket(),
});

/* eslint-disable no-console */
const listBuckets = async (
  mainWindow,
  payload = {},
) => {
  try {
    const res = await spaceClient.listBuckets(payload);
    const bucketsList = res.getBucketsList().map(getBucketData);

    mainWindow.webContents.send(LIST_SUCCESS_EVENT, { bucketsList });

    bucketsList.forEach((bucket) => {
      listDirectory(mainWindow, {
        bucket: bucket.name,
        path: '',
        fetchSubFolders: false,
      });
    });
  } catch (error) {
    console.error('LIST_ERROR_EVENT', error);

    mainWindow.webContents.send(LIST_ERROR_EVENT, error);
  }
};

const registerObjectsEvents = (mainWindow) => {
  ipcMain.on(LIST_FETCH_EVENT, async (event, payload) => {
    await listBuckets(mainWindow, payload);
  });

  ipcMain.on(TOGGLE_BUCKET_BACKUP_EVENT, async (event, payload) => {
    try {
      await spaceClient.toggleBucketBackup(payload);
      mainWindow.webContents.send(TOGGLE_BUCKET_BACKUP_SUCCESS_EVENT);
    } catch (error) {
      console.error('TOGGLE_BUCKET_BACKUP_ERROR_EVENT', error);

      mainWindow.webContents.send(TOGGLE_BUCKET_BACKUP_ERROR_EVENT, error);
    }
  });
};

module.exports = registerObjectsEvents;
