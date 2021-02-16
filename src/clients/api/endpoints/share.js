/* eslint-disable import/prefer-default-export */
const DEFAULT_PATH = '/share';

/**
 * @typedef {Object} data
 * @property {string} fileName
 * @property {string} invitationLink
 * @property {string} senderName
*/

/**
 * @typedef {Object} shareByEmailPayload
 * @property {string} token - Auth token.
 * @property {object} data - data.
 * @property {string} type - Type of email.
 * @property {Array.<string>} toAddresses - Recipient addresses.
 *
 * @this {import('../client.js')}
 * @param {sharePayload} payload - Payload to update an indentity.
 */
function shareByEmail(payload) {
  const { token, ...body } = payload;

  return this.instance({
    data: body,
    method: 'post',
    url: DEFAULT_PATH,
    headers: {
      Authorization: token,
    },
  });
}

export {
  shareByEmail,
};
