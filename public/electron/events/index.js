const registerAuthEvents = require('./auth');
// const registerModalEvents = require('./modal');
const registerEventStream = require('./stream');
const registerTxlSubscribe = require('./txl-subscribe');
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
const registerNotificationNotificationSuscribe = require('./notifications-subscribe');

const registerEvents = ({
  app,
  isDev,
  mainWindow,
}) => {
  const stream = registerEventStream(mainWindow);
  const txlStream = registerTxlSubscribe(mainWindow);
  const notificationStream = registerNotificationNotificationSuscribe(mainWindow);

  registerAuthEvents(mainWindow);
  // registerModalEvents(mainWindow);
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

  if (!isDev && process.env.SKIP_AUTOUPDATE !== 'true') {
    registerAppUpdate({ app, mainWindow });
  }

  return () => {
    stream.destroy();
    txlStream.destroy();
    notificationStream.destroy();
  };
};

module.exports = registerEvents;
