const { spaceClient } = require('../clients');
const { entryToObject } = require('./objects');

const EVENT_PREFIX = 'fileInfoSubscribe';
const FILE_INFO_ERROR_EVENT = `${EVENT_PREFIX}:error`;
const FILE_INFO_SUCCESS_EVENT = `${EVENT_PREFIX}:success`;

const registerFileInfoSubscribe = (mainWindow) => {
  const eventStream = spaceClient.fileInfoSubscribe();

  eventStream.on('data', async (data) => {
    const entry = data.getFile();
    const fileObject = entryToObject(entry, 'personal');

    mainWindow.webContents.send(FILE_INFO_SUCCESS_EVENT, fileObject);
  });

  /* eslint-disable no-console */
  eventStream.on('error', (error) => {
    try {
      console.error('FILE_INFO_ERROR_EVENT', error);
      mainWindow.webContents.send(FILE_INFO_ERROR_EVENT, error);
    } catch (err) {
      console.error(err);
    }
  });

  return eventStream;
};

module.exports = registerFileInfoSubscribe;
