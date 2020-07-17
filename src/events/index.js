import registerAuthEvents from './auth';
import registerEventStream from './stream';
import registerShortcuts from './shortcuts';
import registerShareEvents from './share';
import registerObjectsEvents from './objects';
import registerTxlSubscribeEvents from './txl-subscribe';
import registerAddItemsSubscribeEvents from './add-items-subscribe';

const registerEvents = () => {
  registerShortcuts();
  registerAuthEvents();
  registerEventStream();
  registerShareEvents();
  registerObjectsEvents();
  registerTxlSubscribeEvents();
  registerAddItemsSubscribeEvents();
};

export default registerEvents;
export * from './auth';
export * from './share';
export * from './objects';
export * from './add-items-subscribe';
