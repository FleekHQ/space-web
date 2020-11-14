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
        if (args.length > 0) {
          const lastArgument = args[args.length - 1];
          // options
          // additionalMetadata: optional metadata field,
          if (typeof lastArgument === 'object' && lastArgument.additionalMetadata) {
            /* eslint-disable-next-line max-len */
            const newArgs = [...args.slice(0, args.length - 1), tokenMetadata(lastArgument.additionalMetadata)];
            const response = spaceClientBase[target.name](...newArgs);
            if (response instanceof Promise) {
              return response
                .then((res) => resolve(res))
                .catch((e) => reject(e));
            }
            return resolve(response);
          }
        }
        const newArgs = [...args, tokenMetadata()];
        const response = spaceClientBase[target.name](...newArgs);
        if (response instanceof Promise) {
          return response
            .then((res) => resolve(res))
            .catch((e) => reject(e));
        }
        return resolve(response);
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
