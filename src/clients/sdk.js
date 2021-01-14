import { Users, BrowserStorage, UserStorage } from '@spacehq/sdk';
import config from '@config';

/** @type {Users} */
let users;

/**
 * @returns {Users}
 */
const getUsers = async () => {
  if (users) {
    return users;
  }

  users = await Users.withStorage(new BrowserStorage(), {
    endpoint: config.ws.url,
    vaultServiceConfig: {
      serviceUrl: config.vault.serviceUrl,
      saltSecret: config.vault.saltSecret,
    },
  }, (error, identity) => {
    // eslint-disable-next-line no-console
    console.log('error', error);
    // eslint-disable-next-line no-console
    console.log('identity', identity);
  });

  return users;
};

/**
 * @returns {?UserStorage}
 */
const getStorage = async () => {
  if (!users) {
    users = await getUsers();
  }

  const usersList = users.list();
  if (usersList.length > 0) {
    return new UserStorage(usersList[0], {
      textileHubAddress: config.textileHubAddress,
    });
  }

  return null;
};

export default {
  getUsers,
  getStorage,
};
