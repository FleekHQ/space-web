const ApiClient = require('./client');

// eslint-disable-next-line no-console
console.log(`Init ApiClient pointing to: ${process.env.SPACE_SERVICES_URL}`);

const apiClient = new ApiClient({
  timeout: 5000,
  baseURL: process.env.SPACE_SERVICES_URL || 'https://api-dev.space.storage',
});

module.exports = apiClient;
