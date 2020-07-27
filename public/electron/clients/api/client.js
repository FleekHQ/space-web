const axios = require('axios');

const identityEndpoints = require('./endpoints/identity');

/**
 * @class
 * @param {Object} config - Config for api client.
 * @param {string} config.baseURL - Base url.
 * @param {number} [config.timeout] - Base timeout in ms.
 * @param {Object} [config.headers] - Base headers.
 */
function ApiClient({
  baseURL,
  headers,
  timeout,
}) {
  /**
   * Axios instance.
   * @name ApiClient#instance
   * @type {axios.AxiosInstance}
   */
  this.instance = axios.create({
    baseURL,
  });

  if (timeout) {
    this.instance.defaults.timeout = timeout;
  }

  if (headers && typeof headers === 'object') {
    this.instance.defaults.headers.common = {
      ...headers,
    };
  }

  /**
   * Identity endpoints.
   * @name ApiClient#identity
   */
  this.identity = identityEndpoints;
}

module.exports = ApiClient;
