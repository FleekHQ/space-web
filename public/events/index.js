const registerEventStream = require('./stream');
const registerObjectsEvents = require('./objects');
const registerPathInfoEvents = require('./path-info');
const registerGenerateKeyPairEvents = require('./generate-key-pair');
const registerUploadEvents = require('./upload');

const registerEvents = (mainWindow) => {
  const stream = registerEventStream(mainWindow);

  registerObjectsEvents(mainWindow);
  registerPathInfoEvents(mainWindow);
  registerGenerateKeyPairEvents(mainWindow);
  registerUploadEvents(mainWindow);

  return () => stream.destroy();
};

module.exports = registerEvents;
