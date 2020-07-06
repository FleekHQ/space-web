const spaceClient = require('../space-client');
const { listDirectories } = require('./objects');

const EVENT_PREFIX = 'txlSuscribe';

const registerTxlSubscribe = (mainWindow) => {
  const eventStream = spaceClient.txlSubscribe();

  eventStream.on('data', async () => {
    await listDirectories(mainWindow);
  });

  eventStream.on('error', (error) => {
    mainWindow.webContents.send(`${EVENT_PREFIX}:error`, error);
  });

  return eventStream;
};

module.exports = registerTxlSubscribe;
