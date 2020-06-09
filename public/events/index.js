const registerEventStream = require('./stream');
const registerConfigEvents = require('./config');
const registerPathInfoEvents = require('./path-info');
const registerObjectsEvents = require('./objects').default;
const registerGenerateKeyPairEvents = require('./generate-key-pair');
const registerAddItemsEvents = require('./add-items');
const registerTxlSubscribe = require('./txl-subscribe');

const registerEvents = (mainWindow) => {
  const stream = registerEventStream(mainWindow);
  const txlStream = registerTxlSubscribe(mainWindow);

  registerConfigEvents(mainWindow);
  registerObjectsEvents(mainWindow);
  registerPathInfoEvents(mainWindow);
  registerGenerateKeyPairEvents(mainWindow);
  registerAddItemsEvents(mainWindow);

  return () => {
    stream.destroy();
    txlStream.destroy();
  };
};

module.exports = registerEvents;
