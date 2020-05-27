const registerEventStream = require('./stream');
const registerPathInfoEvents = require('./path-info');
const registerGenerateKeyPairEvents = require('./generate-key-pair');

const registerEvents = (mainWindow) => {
  registerEventStream(mainWindow);
  registerPathInfoEvents(mainWindow);
  registerGenerateKeyPairEvents(mainWindow);
};

module.exports = registerEvents;
