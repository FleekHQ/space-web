import registerEventStream from './stream';
import registerShortcuts from './shortcuts';
import registerConfigEvents from './config';
import registerObjectsEvents from './objects';
import registerPathInfoEvents from './path-info';
import registerGenerateKeyPairEvents from './generate-key-pair';
import registerAddItemsEvents from './add-items';

const registerEvents = () => {
  registerShortcuts();
  registerEventStream();
  registerConfigEvents();
  registerObjectsEvents();
  registerPathInfoEvents();
  registerGenerateKeyPairEvents();
  registerAddItemsEvents();
};

export default registerEvents;
export * from './config';
export * from './objects';
export * from './path-info';
export * from './generate-key-pair';
export * from './add-items';
