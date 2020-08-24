const omit = require('lodash/omit');

const DEFAULT_PATH = '/identity';

/**
 * @typedef {Object} Identity
 * @property {string} address
 * @property {string} username
 * @property {string} publicKey
 * @property {string} createdAt
 * @property {string=} profilePicture
*/

/**
 * @this {import('../client.js')}
 * @param {Object} payload - Payload to create an indentity.
 * @param {string} payload.username - Username of the identity.
 * @param {string} payload.publicKey - Public key of the identity.
 * @returns {import('axios').AxiosResponse<Identity>}
 */
function create(payload) {
  return this.instance({
    method: 'post',
    url: DEFAULT_PATH,
    data: payload,
  });
}

/**
  * @this {import('../client.js')}
  * @param {Object} payload - Payload to get multiple identities.
  * @param {Array.<string>} payload.keys - Array of public keys.
  * @returns {import('axios').AxiosResponse<Array.<Identity>>}
*/
function getMultiple(payload) {
  return this.instance({
    method: 'get',
    url: DEFAULT_PATH,
    params: {
      keys: JSON.stringify(payload.keys),
    },
  });
}

/**
 * @this {import('../client.js')}
 * @param {Object} payload - Payload to get an identity by address.
 * @param {string} payload.address - Address to get identity.
 * @returns {import('axios').AxiosResponse<Identity>}
 */
function getByAddress(payload) {
  return this.instance({
    method: 'get',
    url: `${DEFAULT_PATH}/address/${payload.address}`,
  });
}

/**
 * @this {import('../client.js')}
 * @param {Object} payload - Payload to get an identity by username.
 * @param {string} payload.username - Username to get identity.
 * @returns {import('axios').AxiosResponse<Identity>}
 */
function getByUsername(payload) {
  return this.instance({
    method: 'get',
    url: `${DEFAULT_PATH}/username/${payload.username}`,
  });
}

/**
 * @this {import('../client.js')}
 * @param {Object} payload - Payload to create an indentity.
 * @param {string} payload.token - Auth token
 * @param {string=} payload.username - Username of the identity.
 * @param {string=} payload.displayName - Public key of the identity.
 * @returns {import('axios').AxiosResponse<Identity>}
 */
function update(payload) {
  return this.instance({
    method: 'put',
    url: DEFAULT_PATH,
    headers: {
      Authorization: payload.token,
    },
    data: omit(payload, ['token']),
  });
}

/**
 * @this {import('../client.js')}
 * @param {Object} payload - Payload to create an indentity.
 * @param {string} payload.token - Auth token
 * @param {string} payload.base64Image - Username of the identity.
 * @returns {import('axios').AxiosResponse<Identity>}
 */
function uploadProfilePic(payload) {
  return this.instance({
    method: 'post',
    url: `${DEFAULT_PATH}/avatar`,
    headers: {
      Authorization: payload.token,
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: payload.base64Image,
  });
}

module.exports = {
  create,
  update,
  getMultiple,
  getByAddress,
  getByUsername,
  uploadProfilePic,
};
