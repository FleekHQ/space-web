import axios from 'axios';

import * as identityEndpoints from './endpoints/identity';
import * as identitiesEndpoints from './endpoints/identities';
import * as shareEndpoints from './endpoints/share';
import * as filecoinEndpoints from './endpoints/filecoin';

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

  /**
   * Share endpoints.
   * @name Client#share
   * @type {import('./endpoints/share.js')}
   */
  this.share = Object.keys(shareEndpoints).reduce((shareMethods, key) => ({
    ...shareMethods,
    [key]: shareEndpoints[key].bind(this),
  }), {});

  /**
   * Filecoin endpoints.
   * @name Client#filecoin
   * @type {import('./endpoints/filecoin.js')}
   */
  this.filecoin = Object.keys(filecoinEndpoints).reduce((filecoinMethods, key) => ({
    ...filecoinMethods,
    [key]: filecoinEndpoints[key].bind(this),
  }), {});
}

export default Client;
