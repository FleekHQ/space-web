const ApiClient = require('./client');

const apiClient = new ApiClient({
  timeout: 5000,
  baseURL: process.env.API_URL || 'https://itc1gfzeyj.execute-api.us-west-2.amazonaws.com/dev',
});

module.exports = apiClient;
