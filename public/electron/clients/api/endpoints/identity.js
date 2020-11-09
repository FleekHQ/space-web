const omit = require('lodash/omit');

const DEFAULT_PATH = '/identity';

/**
 * @typedef {Object} Identity
 * @property {string} uuid
 * @property {string} address
 * @property {string} username
 * @property {string} publicKey
 * @property {string} createdAt
 * @property {string} avatarUrl
 * @property {string} displayName
*/

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
 * @param {Object} payload - Payload to create an indentity.
 * @param {string} payload.token - Auth token
 * @param {string=} payload.username - Username of the identity.
 * @param {string=} payload.displayName - Public key of the identity.
 * @returns {import('axios').AxiosResponse<{ data: Identity }>}
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

/**
 * @this {import('../client.js')}
 * @param {Object} payload - Payload to create an indentity.
 * @param {string} payload.token - Auth token
 * @returns {import('axios').AxiosResponse}
 */
function deleteAccount(payload) {
  return this.instance({
    method: 'delete',
    url: `${DEFAULT_PATH}`,
    headers: {
      Authorization: payload.token,
    },
  });
}

/**
 * @this {import('../client.js')}
 * @param {Object} payload - Payload to create an indentity.
 * @param {string} payload.token - Auth token
 * @param {string} payload.address - Eth address
 * @param {string} payload.provider - Auth provider
 * @returns {import('axios').AxiosResponse}
 */
function addEthAddress(payload) {
  return this.instance({
    method: 'post',
    url: '/add-eth-address',
    headers: {
      Authorization: payload.token,
    },
    data: {
      address: payload.address,
      provider: payload.provider,
      metadata: payload.metadata,
    },
  });
}

/**
 * @typedef {Object} Address
 * @property {string} uuid
 * @property {string} address
 * @property {string} createdAt
 * @property {string} provider
 * @property {object} metadata
*/

/**
 * @this {import('../client.js')}
 * @returns {import('axios').AxiosResponse<{ data: [Address] }>}
 */
function getLinkedAddresses(payload) {
  return this.instance({
    method: 'get',
    url: `${DEFAULT_PATH}/addresses`,
    headers: {
      Authorization: payload.token || '',
    },
  });
}

module.exports = {
  update,
  getMultiple,
  deleteAccount,
  addEthAddress,
  uploadProfilePic,
  getLinkedAddresses,
};
