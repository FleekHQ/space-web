const Store = require('electron-store');
const { spaceClient } = require('../clients');

const appTokenStoreKey = 'masterAppToken';

const returnMetadata = (token = '') => (metadata = {}) => ({
  ...metadata,
  authorization: `AppToken ${token}`,
});

const getMasterAppToken = async () => {
  const store = new Store();
  let token = store.get(appTokenStoreKey);
  try {
    // verifying if token is already initialized
    if (token) {
      return returnMetadata(token);
    }

    // if token is not initialized, we initialize it
    console.log('initializing master app token');
    const initializeMasterAppTokenRes = await spaceClient.initializeMasterAppToken();
    token = initializeMasterAppTokenRes.getApptoken();
    console.log(token);

    store.set(appTokenStoreKey, token);
    console.log('Stored app token in electron local');
  } catch (error) {
    console.error('Failed to intialize master app token', error);
  }

  return returnMetadata(token);
};

module.exports = getMasterAppToken;
