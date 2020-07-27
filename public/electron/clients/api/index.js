const ApiClient = require('./client');

const apiClient = new ApiClient({
  timeout: 5000,
  baseURL: process.env.API_URL,
  headers: {
    authorization: 'Bearer SomeToken',
  },
});

module.exports = apiClient;
