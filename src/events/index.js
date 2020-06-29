import registerAuthEvents from './auth';
import registerEventStream from './stream';
import registerShortcuts from './shortcuts';
import registerObjectsEvents from './objects';
import registerPathInfoEvents from './path-info';
import registerGenerateKeyPairEvents from './generate-key-pair';
import registerTxlSubscribeEvents from './txl-subscribe';
import registerAddItemsSubscribeEvents from './add-items-subscribe';

const registerEvents = () => {
  registerShortcuts();
  registerAuthEvents();
  registerEventStream();
  registerObjectsEvents();
  registerPathInfoEvents();
  registerGenerateKeyPairEvents();
  registerTxlSubscribeEvents();
  registerAddItemsSubscribeEvents();
};

export default registerEvents;
export * from './auth';
export * from './objects';
export * from './path-info';
export * from './generate-key-pair';
export * from './add-items-subscribe';
