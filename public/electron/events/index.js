const registerAuthEvents = require('./auth');

const registerObjectsEvents = require('./objects').default;
const registerAddItemsSubscribe = require('./add-items-subscribe');
const registerAppUpdate = require('./app-update');
const registerShareUpdate = require('./share');
const registerBucketEvents = require('./bucket');
const registerKeysEvents = require('./keys');
const registerNotificationsEvents = require('./notifications');
const registerAccountEvents = require('./account');
const registerFolderEvents = require('./folder');
const registerIdentitiesEvents = require('./identities');
const registerUsageEvents = require('./usage');
const registerWalletEvents = require('./wallet');
const registerWinResizeEvents = require('./win-resize');
const registerShellEvents = require('./shell');
const registerSubscriptions = require('./subscriptions');

const registerEvents = ({
  app,
  isDev,
  mainWindow,
}) => {
  registerAuthEvents(mainWindow);
  registerShareUpdate(mainWindow);
  registerObjectsEvents(mainWindow);
  registerAddItemsSubscribe(mainWindow);
  registerBucketEvents(mainWindow);
  registerKeysEvents(mainWindow);
  registerNotificationsEvents(mainWindow);
  registerAccountEvents(mainWindow);
  registerFolderEvents(mainWindow);
  registerIdentitiesEvents(mainWindow);
  registerUsageEvents(mainWindow);
  registerWalletEvents(mainWindow);
  registerWinResizeEvents(mainWindow);
  registerShellEvents(mainWindow);
  registerSubscriptions(mainWindow);

  if (!isDev && process.env.SKIP_AUTOUPDATE !== 'true') {
    registerAppUpdate({ app, mainWindow });
  }
};

module.exports = registerEvents;
