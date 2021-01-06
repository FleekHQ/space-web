/* eslint-disable */
import { Users, BrowserStorage, UserStorage } from '@spacehq/sdk';

/** @type {Users} */
let users;
let storage;

/**
 * @typedef {Object} Sdk
 * @property {Users} users
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
    endpoint: 'wss://gqo1oqz055.execute-api.us-west-2.amazonaws.com/dev',
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
