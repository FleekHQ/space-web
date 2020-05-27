import registerEventStream from './stream';
import registerObjectsEvents from './objects';
import registerPathInfoEvents from './path-info';
import registerGenerateKeyPairEvents from './generate-key-pair';

const registerEvents = () => {
  registerEventStream();
  registerObjectsEvents();
  registerPathInfoEvents();
  registerGenerateKeyPairEvents();
};

export default registerEvents;
export * from './stream';
export * from './objects';
export * from './path-info';
export * from './generate-key-pair';
