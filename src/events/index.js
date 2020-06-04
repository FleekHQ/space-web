import registerEventStream from './stream';
import registerShortcuts from './shortcuts';
import registerConfigEvents from './config';
import registerObjectsEvents from './objects';
import registerPathInfoEvents from './path-info';
import registerGenerateKeyPairEvents from './generate-key-pair';
import registerUploadEvents from './upload';

const registerEvents = () => {
  registerShortcuts();
  registerEventStream();
  registerConfigEvents();
  registerObjectsEvents();
  registerPathInfoEvents();
  registerGenerateKeyPairEvents();
  registerUploadEvents();
};

export default registerEvents;
export * from './config';
export * from './objects';
export * from './path-info';
export * from './generate-key-pair';
export * from './upload';
