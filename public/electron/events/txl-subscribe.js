const client = require('../client');
const { listDirectories } = require('./objects');

const EVENT_PREFIX = 'txlSuscribe';

const registerTxlSubscribe = (mainWindow) => {
  const eventStream = client.TxlSubscribe();

  eventStream.on('data', () => {
    listDirectories(mainWindow);
  });

  eventStream.on('error', (error) => {
    mainWindow.webContents.send(`${EVENT_PREFIX}:error`, error);
  });

  return eventStream;
};

module.exports = registerTxlSubscribe;
