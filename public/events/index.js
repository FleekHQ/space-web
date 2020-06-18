const registerModalEvents = require('./modal');
const registerEventStream = require('./stream');
const registerConfigEvents = require('./config');
const registerPathInfoEvents = require('./path-info');
const registerTxlSubscribe = require('./txl-subscribe');
const registerObjectsEvents = require('./objects').default;
const registerAddItemsSubscribe = require('./add-items-subscribe');
const registerGenerateKeyPairEvents = require('./generate-key-pair');

const registerEvents = (mainWindow) => {
  const stream = registerEventStream(mainWindow);
  const txlStream = registerTxlSubscribe(mainWindow);

  registerModalEvents(mainWindow);
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
