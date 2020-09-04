const ApiClient = require('./client');

const apiClient = new ApiClient({
  timeout: 5000,
  baseURL: process.env.SPACE_SERVICES_URL || 'https://api-dev.space.storage',
});

module.exports = apiClient;
