/* eslint-disable */
import { Users, BrowserStorage, UserStorage } from '@spacehq/sdk';

/** @type {Users} */
let users;

/** @type {UserStorage} */
let storage;

/**
 * @typedef {Object} Sdk
 * @property {Users} users
 * @property {UserStorage} storage
 * @returns {Sdk}
 */
const init = async () => {
  if (typeof users !== 'undefined' && typeof storage !== 'undefined') {
    return {
      users,
      storage,
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

  const usersList = users.list();
  storage = new UserStorage(usersList[0]);

  return {
    users,
    storage,
  };
};

export default init();
