const fs = require('fs');
const path = require('path');
const { ipcMain } = require('electron');

const { spaceClient } = require('../clients');
const { listDirectory } = require('./objects');

const EVENT_PREFIX = 'addItemsSubscribe';
const SUBSCRIBE_START_EVENT = `${EVENT_PREFIX}:start`;
const SUBSCRIBE_ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUBSCRIBE_SUCCESS_EVENT = `${EVENT_PREFIX}:success`;

const registerAddItemsSubscribe = (mainWindow) => {
  let eventStream;

  ipcMain.on(SUBSCRIBE_START_EVENT, (_, { id, payload, bucket = 'personal' }) => {
    eventStream = spaceClient.addItems({
      targetPath: payload.targetPath,
      sourcePaths: payload.sourcePaths,
    });

    eventStream.on('data', async (event) => {
      const result = event.getResult();

      let fileFolderName = '';
      let fileFolderPath = '';
      const totalBytes = event.getTotalbytes();
      const bucketPath = result.getBucketpath();
      const sourcePath = result.getSourcepath();

      let fileExtension = path.extname(sourcePath);
      if (fileExtension.length > 0) {
        fileExtension = fileExtension.replace('.', '');
      }

      const [srcPath] = payload.sourcePaths.filter((_folderPath) => (
        sourcePath.includes(_folderPath)
      ));

      if (srcPath) {
        fileFolderName = sourcePath.replace(srcPath, '');
        if (fileFolderName.length === 0) {
          fileFolderName = sourcePath.split('/').pop();
          fileFolderPath = payload.targetPath.length === 0 ? fileFolderName : `${payload.targetPath}/${fileFolderName}`;
        } else {
          fileFolderPath = payload.targetPath.length === 0 ? `${srcPath.split('/').pop()}${fileFolderName}` : `${payload.targetPath}/${srcPath.split('/').pop()}${fileFolderName}`;
          fileFolderName = fileFolderName.split('/').pop();
        }
      }

      mainWindow.webContents.send(
        SUBSCRIBE_SUCCESS_EVENT,
        {
          id,
          payload: {
            result: {
              sourcePath,
              bucketPath,
              error: result.getError(),
            },
            totalBytes,
            totalFiles: event.getTotalfiles(),
            completedFiles: event.getCompletedfiles(),
            completedBytes: event.getCompletedbytes(),
          },
          object: {
            bucket,
            fileExtension,
            backupCount: 0,
            path: fileFolderPath,
            name: fileFolderName,
            sizeInBytes: totalBytes,
            isLocallyAvailable: true,
            created: (new Date()).toISOString(),
            updated: (new Date()).toISOString(),
            ipfsHash: bucketPath.split('/').pop(),
            isDir: fs.existsSync(sourcePath) && fs.lstatSync(sourcePath).isDirectory(),
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
      console.log('Add item stream ended');
    });
  });
};

module.exports = registerAddItemsSubscribe;
