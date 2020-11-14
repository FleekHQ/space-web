const { SpaceClient } = require('@fleekhq/space-client');
const { getAppTokenMetadata } = require('../utils');

const spaceClientBase = new SpaceClient({
  url: 'http://0.0.0.0:9998',
});

const unProxiedHandler = {
  get(target, property) {
    return target[property];
  },
};

const proxiedHandler = {
  apply: (target, thisArg, args) => new Promise((resolve, reject) => {
    getAppTokenMetadata(spaceClientBase)
      .then((tokenMetadata) => {
        let skipPromiseOption;
        if (args.length > 0) {
          const lastArgument = args[args.length - 1];
          if (typeof lastArgument === 'object') {
            // options
            // additionalMetadata: optional metadata field,
            // skipPromise: will not call a promise. Used for streams
            const {
              additionalMetadata,
              skipPromise,
            } = lastArgument;
            skipPromiseOption = skipPromise;
            if (additionalMetadata) {
              /* eslint-disable-next-line max-len */
              const newArgs = [...args.slice(0, args.length - 1), tokenMetadata(additionalMetadata)];
              if (skipPromiseOption) {
                return spaceClientBase[target.name](...newArgs);
              }
              return spaceClientBase[target.name](...newArgs)
                .then((res) => resolve(res))
                .catch((e) => reject(e));
            }
          }
        }
        const newArgs = [...args, tokenMetadata()];
        if (skipPromiseOption) {
          return spaceClientBase[target.name](...newArgs);
        }
        return spaceClientBase[target.name](...newArgs)
          .then((res) => resolve(res))
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  }),
};

// note: We can can client.notProxied.method if we want to disable the proxying
const spaceClientProxy = new Proxy(spaceClientBase, {
  get(target, property) {
    if (property === 'notProxied') {
      return new Proxy(target, unProxiedHandler);
    }
    return new Proxy(target[property], proxiedHandler);
  },
});

module.exports = spaceClientProxy;
