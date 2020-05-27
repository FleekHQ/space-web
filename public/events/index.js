const registerEventStream = require('./stream');
const registerPathInfoEvents = require('./path-info');
const registerGenerateKeyPairEvents = require('./generate-key-pair');

const registerEvents = (mainWindow) => {
  const stream = registerEventStream(mainWindow);
  registerPathInfoEvents(mainWindow);
  registerGenerateKeyPairEvents(mainWindow);

  return () => stream.destroy();
};

module.exports = registerEvents;
