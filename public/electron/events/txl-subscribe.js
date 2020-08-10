const { spaceClient } = require('../clients');
const { listDirectories } = require('./objects');

const EVENT_PREFIX = 'txlSuscribe';

const registerTxlSubscribe = (mainWindow) => {
  const eventStream = spaceClient.txlSubscribe();

  eventStream.on('data', async () => {
    await listDirectories(mainWindow);
  });

  eventStream.on('error', (error) => {
    try {
      mainWindow.webContents.send(`${EVENT_PREFIX}:error`, error);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  });

  return eventStream;
};

module.exports = registerTxlSubscribe;
