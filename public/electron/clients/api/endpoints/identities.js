const DEFAULT_PATH = '/identities';

/**
 * @this {import('../client.js')}
 * @param {Object} payload - Payload to get an identity by address.
 * @param {string} payload.token - Services token.
 * @param {Array.<string>} payload.addresses - Address to get identity.
 * @returns {import('axios').AxiosResponse<{ data: import('./identity').Identity }>}
 */
function getByAddress(payload) {
  return this.instance({
    method: 'get',
    url: DEFAULT_PATH,
    headers: {
      Authorization: payload.token,
    },
    params: {
      address: payload.addresses.join(','),
    },
  });
}

/**
 * @this {import('../client.js')}
 * @param {Object} payload - Payload to get an identity by username.
 * @param {string=} payload.token - Services token.
 * @param {Array.<string>} payload.usernames - Username to get identity.
 * @returns {import('axios').AxiosResponse<{ data: import('./identity').Identity }>}
 */
function getByUsername(payload) {
  return this.instance({
    method: 'get',
    url: DEFAULT_PATH,
    headers: {
      Authorization: payload.token || '',
    },
    params: {
      username: payload.usernames.join(','),
    },
  });
}

/**
 * @typedef {Object} Address
 * @property {string} uuid
 * @property {string} address
 * @property {string} createdAt
 * @property {string} provider
*/

/**
 * @this {import('../client.js')}
 * @returns {import('axios').AxiosResponse<{ data: Address }>}
 */
function getLinkedAddresses(payload) {
  return this.instance({
    method: 'get',
    url: DEFAULT_PATH,
    headers: {
      Authorization: payload.token || '',
    },
  });
}

module.exports = {
  getByAddress,
  getByUsername,
  getLinkedAddresses,
};
