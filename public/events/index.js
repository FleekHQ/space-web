const registerEventStream = require('./stream');
const registerConfigEvents = require('./config');
const registerPathInfoEvents = require('./path-info');
const registerObjectsEvents = require('./objects').default;
const registerGenerateKeyPairEvents = require('./generate-key-pair');
const registerTxlSubscribe = require('./txl-subscribe');
const registerAddItemsSubscribe = require('./add-items-subscribe');

const registerEvents = (mainWindow) => {
  const stream = registerEventStream(mainWindow);
  const txlStream = registerTxlSubscribe(mainWindow);

  registerConfigEvents(mainWindow);
  registerObjectsEvents(mainWindow);
  registerPathInfoEvents(mainWindow);
  registerAddItemsSubscribe(mainWindow);
  registerGenerateKeyPairEvents(mainWindow);

  return () => {
    stream.destroy();
    txlStream.destroy();
  };
};

module.exports = registerEvents;
