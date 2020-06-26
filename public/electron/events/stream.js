const client = require('../client');

const EVENT_PREFIX = 'eventStream';

const registerEventStream = (mainWindow) => {
  const eventStream = client.Subscribe();

  eventStream.on('data', (event) => {
    // TODO: Check with BE event to update files on FE
    // mainWindow.webContents.send(`${EVENT_PREFIX}:data`, event);

    if (event.type && event.entry) {
      mainWindow.webContents.send(
        `${EVENT_PREFIX}:${event.type}`,
        event.entry,
      );
    }
  });

  eventStream.on('error', (error) => {
    mainWindow.webContents.send(`${EVENT_PREFIX}:error`, error);
  });

  return eventStream;
};

module.exports = registerEventStream;
