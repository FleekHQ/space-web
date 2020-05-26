const client = require('../client');

const EVENT_PREFIX = 'eventStream';

const registerEventStream = (mainWindow) => {
  const eventStream = client.Subscribe();

  eventStream.on('data', (event) => {
    mainWindow.webContents.send(`${EVENT_PREFIX}:data`, event);
  });

  eventStream.on('error', (error) => {
    mainWindow.webContents.send(`${EVENT_PREFIX}:error`, error);
  });
};

module.exports = registerEventStream;
