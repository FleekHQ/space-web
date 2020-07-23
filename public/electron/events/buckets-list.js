const { ipcMain } = require('electron');

const spaceClient = require('../space-client');

const EVENT_PREFIX = 'buckets-list';
const FETCH_EVENT = `${EVENT_PREFIX}:fetch`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUCCESS_EVENT = `${EVENT_PREFIX}:success`;

const getBucketData = (bucket) => ({
  key: bucket.getKey(),
  name: bucket.getName(),
  path: bucket.getPath(),
  createdAt: bucket.getCreatedat(),
  updatedAt: bucket.getUpdatedat(),
  membersList: bucket.getMembersList(),
  isSelectGroupBucket: bucket.getIsselectgroupbucket(),
});

const listBuckets = async (
  mainWindow,
  payload = {},
) => {
  try {
    const res = await spaceClient.listBuckets(payload);
    const bucketsList = res.getBucketsList().map(getBucketData);

    mainWindow.webContents.send(SUCCESS_EVENT, { bucketsList });
  } catch (error) {
    mainWindow.webContents.send(ERROR_EVENT, error);

    // mockup data with fake success event
    const bucketsList = Array.from({ length: 20 }, (_, index) => ({
      name: `bucket-${index}`,
      membersList: [{
        username: `Username-${index}`,
        email: 'username@gmail.com',
      }],
    }));

    mainWindow.webContents.send(SUCCESS_EVENT, { bucketsList });
  }
};

const registerObjectsEvents = (mainWindow) => {
  ipcMain.on(FETCH_EVENT, async (event, payload) => {
    await listBuckets(mainWindow, payload);
  });
};

module.exports = registerObjectsEvents;
