import registerEventStream from './stream';
import registerPathInfoEvents from './path-info';
import registerGenerateKeyPairEvents from './generate-key-pair';

const registerEvents = () => {
  registerEventStream();
  registerPathInfoEvents();
  registerGenerateKeyPairEvents();
};

export default registerEvents;
export * from './stream';
export * from './path-info';
export * from './generate-key-pair';
