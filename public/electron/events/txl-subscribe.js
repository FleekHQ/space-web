const { spaceClient } = require('../clients');
const { listDirectories, listSharedFiles } = require('./objects');

const EVENT_PREFIX = 'txlSuscribe';

const registerTxlSubscribe = (mainWindow) => {
  const eventStream = spaceClient.txlSubscribe();

  eventStream.on('data', async (data) => {
    const bucket = data.getBucket();

    if (bucket === 'personal') {
      await listDirectories(mainWindow);
    } else {
      await listSharedFiles(mainWindow);
    }
  });

  /* eslint-disable no-console */
  eventStream.on('error', (error) => {
    try {
      console.error(`${EVENT_PREFIX}:error`, error);
      mainWindow.webContents.send(`${EVENT_PREFIX}:error`, error);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  });

  return eventStream;
};

module.exports = registerTxlSubscribe;
