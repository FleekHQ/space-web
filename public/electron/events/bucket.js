const { ipcMain } = require('electron');

const spaceClient = require('../space-client');
const { listDirectory } = require('./objects');

const EVENT_PREFIX = 'bucket';
const LIST_FETCH_EVENT = `${EVENT_PREFIX}:list:fetch`;
const LIST_ERROR_EVENT = `${EVENT_PREFIX}:list:error`;
const LIST_SUCCESS_EVENT = `${EVENT_PREFIX}:list:success`;

const fakeListBucketsSuccess = (mainWindow) => {
  setTimeout(() => {
    // mockup data with fake success event
    const bucketsList = [
      {
        key: 'bafzbeibkw3mqgalcnk3kndxknp2jhnsn7jcoswytvn3cs5x74etjwfgpia',
        path: '/ipfs/bafybeieml6xcd7sjsjpkyltniscu5jwar2va63hvjfp4vyp7ummy42s72e',
        name: 'another-bucket',
        membersList: [{
          address: '0xd606f05a2a980f58737aa913553c8d6eac8b',
          publicKey: '67730a6678566ead5911d71304854daddb1fe98a396551a4be01de65da01f3a9',
          isOwner: false,
        }],
        createdAt: 1595511731521867000,
        updatedAt: 1595511731521867000,
        isPersonalBucket: false,
      },
      {
        key: 'bafqbeibkw3mqgalcnk3kndxknp2jhnsn7jcoswytvn3cs5x74etjwfdpk',
        path: '/ipfs/bafybeieml6xcd7sjsjpkyltniscu5jwar2va63hvjfp4vyp7ummy42s72e',
        name: 'secondary-bucket',
        membersList: [{
          address: '0xa918f05a2a980f58737aa913553c8d6ea1ab',
          publicKey: '81130a6678566ead5911d71304854daddb1fe98a396551a4be01de65da01f3a9',
          isOwner: false,
        }],
        createdAt: 1595511731521867000,
        updatedAt: 1595511731521867000,
        isPersonalBucket: false,
      },
    ];

    // const bucketsList = Array.from({ length: 20 }, (_, index) => ({
    //   name: `bucket-${index}`,
    //   membersList: [{
    //     username: `Username-${index}`,
    //     email: 'username@gmail.com',
    //   }],
    // }));

    bucketsList.forEach((bucket) => {
      listDirectory(mainWindow, {
        bucket: bucket.name,
        path: '',
        fetchSubFolders: false,
      });
    });

    mainWindow.webContents.send(LIST_SUCCESS_EVENT, { bucketsList });
  }, 2000);
};

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

    mainWindow.webContents.send(LIST_SUCCESS_EVENT, { bucketsList });

    bucketsList.forEach((bucket) => {
      listDirectory(mainWindow, {
        bucket: bucket.name,
        path: '',
        fetchSubFolders: false,
      });
    });
  } catch (error) {
    mainWindow.webContents.send(LIST_ERROR_EVENT, error);
    fakeListBucketsSuccess(mainWindow);
  }
};

const registerObjectsEvents = (mainWindow) => {
  ipcMain.on(LIST_FETCH_EVENT, async (event, payload) => {
    await listBuckets(mainWindow, payload);
  });
};

module.exports = registerObjectsEvents;
