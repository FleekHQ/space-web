const registerEventStream = require('./stream');
const registerObjectsEvents = require('./objects');
const registerPathInfoEvents = require('./path-info');
const registerGenerateKeyPairEvents = require('./generate-key-pair');

const registerEvents = (mainWindow) => {
  const stream = registerEventStream(mainWindow);

  registerObjectsEvents(mainWindow);
  registerPathInfoEvents(mainWindow);
  registerGenerateKeyPairEvents(mainWindow);

  return () => stream.destroy();
};

module.exports = registerEvents;
