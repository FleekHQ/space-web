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
  console.log('payload...', payload);
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

/**
 * @typedef {Object} GetByEmailPayload
 * @property {string=} token - Services token.
 * @property {Array.<string>} emails - Emails to get identity.
 *
 * @this {import('../client.js')}
 * @param {GetByEmailPayload} payload - Payload to get an identity by email.
 * @returns {import('axios').AxiosResponse<{ data: Array<import('./identity').Identity> | import('./identity').Identity }>}
 */
function getByEmail(payload) {
  return this.instance({
    method: 'get',
    url: DEFAULT_PATH,
    headers: {
      Authorization: payload.token || '',
    },
    params: {
      email: payload.emails.join(','),
    },
  });
}

/**
 * @typedef {Object} GetIdentitiesQueryPayload
 * @property {string=} token - Services token.
 * @property {Array.<{ type: string; value: string }>} identities
 *
 * @this {import('../client.js')}
 * @param {GetIdentitiesQueryPayload} payload - Payload to get identities by email/displayName.
 * @returns {import('axios').AxiosResponse<{ data: Array<import('./identity').Identity> | import('./identity').Identity }>}
 */
function getIdentitiesQuery(payload) {
  return this.instance({
    method: 'post',
    url: '/identities_query',
    headers: {
      Authorization: payload.token || '',
    },
    data: payload.identities,
  });
}

export {
  getByEmail,
  getByAddress,
  getByUsername,
  getIdentitiesQuery,
};
