/* eslint-disable import/prefer-default-export */

/**
 * @typedef {Object} FilecoinObject
 * @property {string} proposalCid
 * @property {number} state
 * @property {number} duration
 * @property {number} dealId
 * @property {string} creationTime
*/

/**
 * @typedef {Object} fetchDealStatusPayload
 * @property {string} token - Auth token.
 * @property {string} hash - file ipfs hash
 *
 * @this {import('../client.js')}
 * @param {fetchDealStatusPayload} payload - Payload to fetch a deal id
 * @returns {import('axios').AxiosResponse<FilecoinObject>}
 */
function fetchDealStatus(payload) {
  const { token, ...params } = payload;

  return this.instance({
    params,
    method: 'get',
    url: '/dealStatus',
    headers: {
      Authorization: token,
    },
  });
}

/**
 * @typedef {Object} archiveHashPayload
 * @property {string} token - Auth token.
 * @property {string} hash - file ipfs hash
 * @property {number} size - size of file in bytes
 * @property {string} publicKey - public key of user
 *
 * @this {import('../client.js')}
 * @param {archiveHashPayload} payload - Payload archive a hash
 */
function archiveHash(payload) {
  const { token, ...body } = payload;

  return this.instance({
    data: body,
    method: 'post',
    url: '/archiveHash',
    headers: {
      Authorization: token,
    },
  });
}

export {
  archiveHash,
  fetchDealStatus,
};
