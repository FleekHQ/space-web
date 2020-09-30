const DEFAULT_PATH = '/wallet';

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
 * @param {Object} payload - Payload to create an indentity.
 * @param {string} payload.token - Auth token
 * @param {string} payload.base64Image - Username of the identity.
 * @returns {import('axios').AxiosResponse}
 */
function claim(payload) {
  return this.instance({
    method: 'post',
    url: `${DEFAULT_PATH}/claim`,
    headers: {
      Authorization: payload.token,
    },
    data: {
      key: payload.key,
    },
  });
}

module.exports = {
  claim,
};
