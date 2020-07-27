const registerAuthEvents = require('./auth');
// const registerModalEvents = require('./modal');
const registerEventStream = require('./stream');
const registerTxlSubscribe = require('./txl-subscribe');
const registerObjectsEvents = require('./objects').default;
const registerAddItemsSubscribe = require('./add-items-subscribe');
const registerAppUpdate = require('./app-update');
const registerShareUpdate = require('./share');
const registerBucketEvents = require('./bucket');

const registerEvents = ({
  app,
  isDev,
  mainWindow,
}) => {
  const stream = registerEventStream(mainWindow);
  const txlStream = registerTxlSubscribe(mainWindow);

  registerAuthEvents(mainWindow);
  // registerModalEvents(mainWindow);
  registerShareUpdate(mainWindow);
  registerObjectsEvents(mainWindow);
  registerAddItemsSubscribe(mainWindow);
  registerBucketEvents(mainWindow);

  if (!isDev && process.env.SKIP_AUTOUPDATE !== 'true') {
    registerAppUpdate({ app, mainWindow });
  }

  return () => {
    stream.destroy();
    txlStream.destroy();
  };
};

module.exports = registerEvents;
