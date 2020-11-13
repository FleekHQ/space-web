const ApiClient = require('./client');

// process.env.SPACE_SERVICES_URL is specially for local development
const baseURL = process.env.SPACE_SERVICES_URL || 'https://api.space.storage';
// eslint-disable-next-line no-console
console.log(`Init ApiClient, URL: ${baseURL}`);

const apiClient = new ApiClient({
  baseURL,
  timeout: 5000,
});

module.exports = apiClient;
