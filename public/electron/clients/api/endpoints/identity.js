const DEFAULT_PATH = '/identities';

/**
 * @typedef {Object} Identity
 * @property {string} address
 * @property {string} username
 * @property {string} publicKey
 * @property {string} createdAt
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

module.exports = {
  create,
  getMultiple,
  getByAddress,
  getByUsername,
};
