const { spaceClient } = require('../clients');
const { getAppTokenMetadata } = require('../utils');
const { listDirectories, listSharedFiles } = require('./objects');

const EVENT_PREFIX = 'txlSuscribe';

const registerTxlSubscribe = async (mainWindow) => {
  let eventStream = () => {};
  try {
    const tokenMetadata = await getAppTokenMetadata();

    eventStream = spaceClient.txlSubscribe(tokenMetadata());

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
  } catch (e) {
    console.error('Failed to subcribe to txl subcription', e);
  }
  return eventStream;
};

module.exports = registerTxlSubscribe;
