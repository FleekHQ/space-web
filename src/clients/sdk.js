import { Users, BrowserStorage } from '@spacehq/sdk';

/** @type {Users} */
let users;

/**
 * @typedef {Object} Sdk
 * @property {Users} users
 * @returns {Sdk}
 */
const init = async () => {
  if (typeof users !== 'undefined') {
    return {
      users,
    };
  }

  users = await Users.withStorage(new BrowserStorage(), {
    endpoint: 'wss://auth-dev.space.storage',
    vaultServiceConfig: {
      serviceUrl: 'https://vault-dev.space.storage',
      saltSecret: 'WXpKd2JrMUlUbXhhYW10M1RWUkNlV0Z0YkhCYU1tUn',
    },
  }, (error, identity) => {
    // eslint-disable-next-line no-console
    console.log('error', error);
    // eslint-disable-next-line no-console
    console.log('identity', identity);
  });

  return {
    users,
  };
};

export default init();
