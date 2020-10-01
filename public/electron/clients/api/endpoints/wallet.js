const DEFAULT_PATH = '/wallet';

/**
 * @typedef {Object} PlanInfo
 * @property {string} name
 * @property {string} type
 */

/**
 * @this {import('../client.js')}
 * @param {Object} payload
 * @param {string} payload.key
 * @param {string} payload.token
 * @returns {import('axios').AxiosResponse<PlanInfo>}
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
