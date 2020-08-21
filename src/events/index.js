import registerAuthEvents from './auth';
import registerEventStream from './stream';
import registerShortcuts from './shortcuts';
import registerShareEvents from './share';
import registerObjectsEvents from './objects';
import registerTxlSubscribeEvents from './txl-subscribe';
import registerAddItemsSubscribeEvents from './add-items-subscribe';
import registerBucketEvents from './bucket';
import registerKeysEvents from './keys';
import registerNotificationsEvents from './notifications';
import registerAccountEvents from './account';
import registerFolderEvents from './folder';

const registerEvents = () => {
  registerShortcuts();
  registerAuthEvents();
  registerEventStream();
  registerShareEvents();
  registerObjectsEvents();
  registerTxlSubscribeEvents();
  registerAddItemsSubscribeEvents();
  registerBucketEvents();
  registerKeysEvents();
  registerNotificationsEvents();
  registerAccountEvents();
  registerFolderEvents();
};

export default registerEvents;
export * from './auth';
export * from './share';
export * from './objects';
export * from './add-items-subscribe';
export * from './bucket';
export * from './keys';
export * from './notifications';
export * from './account';
export * from './folder';
