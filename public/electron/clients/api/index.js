const ApiClient = require('./client');

const apiClient = new ApiClient({
  timeout: 5000,
  baseURL: process.env.SPACE_SERVICES_URL || 'https://xaoa4ax6v9.execute-api.us-west-2.amazonaws.com/dev',
});

module.exports = apiClient;
