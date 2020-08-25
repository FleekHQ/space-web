const DEFAULT_PATH = '/identities';

/**
 * @this {import('../client.js')}
 * @param {Object} payload - Payload to get an identity by address.
 * @param {string} payload.token - Services token.
 * @param {string} payload.address - Address to get identity.
 * @returns {import('axios').AxiosResponse<Identity>}
 */
function getByAddress(payload) {
  return this.instance({
    method: 'get',
    url: `${DEFAULT_PATH}?address=${payload.address}`,
    headers: {
      Authorization: payload.token,
    },
  });
}

/**
 * @this {import('../client.js')}
 * @param {Object} payload - Payload to get an identity by username.
 * @param {string} payload.username - Username to get identity.
 * @param {string} payload.token - Services token.
 * @returns {import('axios').AxiosResponse<Identity>}
 */
function getByUsername(payload) {
  return this.instance({
    method: 'get',
    url: `${DEFAULT_PATH}?username=${payload.username}`,
    headers: {
      Authorization: payload.token,
    },
  });
}

module.exports = {
  getByAddress,
  getByUsername,
};
