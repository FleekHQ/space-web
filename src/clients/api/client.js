import axios from 'axios';

import * as identityEndpoints from './endpoints/identity';
import * as identitiesEndpoints from './endpoints/identities';

/**
 * @class
 * @param {Object} config - Config for api client.
 * @param {string} config.baseURL - Base url.
 * @param {number} [config.timeout] - Base timeout in ms.
 * @param {Object} [config.headers] - Base headers for client.
 */
function Client({
  baseURL,
  headers,
  timeout,
}) {
  /**
   * Axios instance.
   * @name Client#instance
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
   * @name Client#identity
   * @type {import('./endpoints/identity.js')}
   */
  this.identity = Object.keys(identityEndpoints).reduce((identityMethods, key) => ({
    ...identityMethods,
    [key]: identityEndpoints[key].bind(this),
  }), {});

  /**
   * Identities endpoints.
   * @name Client#identities
   * @type {import('./endpoints/identities.js')}
   */
  this.identities = Object.keys(identitiesEndpoints).reduce((identitiesMethods, key) => ({
    ...identitiesMethods,
    [key]: identitiesEndpoints[key].bind(this),
  }), {});
}

export default Client;
