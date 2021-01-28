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
 * @typedef {Object} UpdatePayload
 * @property {string} token - Auth token.
 * @property {string} email - Identity email.
 * @property {string=} username - Identity username.
 * @property {string=} displayName - Identity displayname.
 *
 * @this {import('../client.js')}
 * @param {UpdatePayload} payload - Payload to update an indentity.
 * @returns {import('axios').AxiosResponse<{ data: Identity }>}
 */
function update(payload) {
  const { token, ...data } = payload;

  return this.instance({
    data,
    method: 'put',
    url: DEFAULT_PATH,
    headers: {
      Authorization: token,
    },
  });
}

/**
 * @typedef {Object} UploadProfilePicPayload
 * @property {string} token - Auth token.
 * @property {string} base64Image - Identity profile pic in base64.
 *
 * @this {import('../client.js')}
 * @param {UploadProfilePicPayload} payload - Payload to create an indentity.
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
 * @typedef {Object} DeleteAccountPayload
 * @property {string} token - Auth Token
 *
 * @this {import('../client.js')}
 * @param {DeleteAccountPayload} payload - Payload to create an indentity.
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
 * @typedef {Object} AddEthAddressPayload
 * @property {string} token - Auth token
 * @property {string} address - Eth address
 * @property {string} provider - Auth provider
 * @property {object} metadata - Auth provider
 *
 * @this {import('../client.js')}
 * @param {AddEthAddressPayload} payload - Payload to create an indentity.
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
 * @typedef {Object} GetLinkedAddressesPayload
 * @property {string} token - Auth token
 *
 * @this {import('../client.js')}
 * @param {GetLinkedAddressesPayload} payload
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

export {
  update,
  deleteAccount,
  addEthAddress,
  uploadProfilePic,
  getLinkedAddresses,
};
