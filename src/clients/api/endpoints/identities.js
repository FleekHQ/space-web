/* eslint-disable max-len */
const DEFAULT_PATH = '/identities';

/**
 * @typedef {Object} GetByAddressPayload
 * @property {string=} token - Services token.
 * @property {Array.<string>} addresses - Username to get identity.
 *
 * @this {import('../client.js')}
 * @param {GetByAddressPayload} payload - Payload to get an identity by address.
 * @returns {import('axios').AxiosResponse<{ data: Array<import('./identity').Identity> | import('./identity').Identity }>}
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
 * @typedef {Object} GetByUsernamePayload
 * @property {string=} token - Services token.
 * @property {Array.<string>} usernames - Username to get identity.
 *
 * @this {import('../client.js')}
 * @param {GetByUsernamePayload} payload - Payload to get an identity by username.
 * @returns {import('axios').AxiosResponse<{ data: Array<import('./identity').Identity> | import('./identity').Identity }>}
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

export {
  getByAddress,
  getByUsername,
};
