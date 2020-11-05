const { ipcMain } = require('electron');

const { spaceClient } = require('../clients');
const { listDirectory } = require('./objects');

const EVENT_PREFIX = 'addItemsSubscribe';
const SUBSCRIBE_START_EVENT = `${EVENT_PREFIX}:start`;
const SUBSCRIBE_ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUBSCRIBE_SUCCESS_EVENT = `${EVENT_PREFIX}:success`;

const registerAddItemsSubscribe = (mainWindow) => {
  let eventStream;

  ipcMain.on(SUBSCRIBE_START_EVENT, (_, { id, payload }) => {
    eventStream = spaceClient.addItems(payload);

    eventStream.on('data', async (event) => {
      const result = event.getResult();

      mainWindow.webContents.send(
        SUBSCRIBE_SUCCESS_EVENT,
        {
          id,
          payload: {
            result: {
              sourcePath: result.getSourcepath(),
              bucketPath: result.getBucketpath(),
              error: result.getError(),
            },
            totalBytes: event.getTotalbytes(),
            totalFiles: event.getTotalfiles(),
            completedFiles: event.getCompletedfiles(),
            completedBytes: event.getCompletedbytes(),
          },
        },
      );

      const listDirPayload = {
        path: payload.targetPath,
        fetchSubFolders: true,
        ...(payload.bucket && { bucket: payload.bucket }),
      };

      await listDirectory(mainWindow, listDirPayload);
    });

    eventStream.on('error', (error) => {
      // eslint-disable-next-line no-console
      console.error('SUBSCRIBE_ERROR_EVENT', error);

      mainWindow.webContents.send(
        SUBSCRIBE_ERROR_EVENT,
        { id, payload: error },
      );
    });

    eventStream.on('end', () => {
      // eslint-disable-next-line no-console
      console.log('Add item steam ended');
    });
  });
};

module.exports = registerAddItemsSubscribe;
