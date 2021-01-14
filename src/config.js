import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

const {
  NODE_ENV,
  REACT_APP_TORUS_NETWORK,
  REACT_APP_TORUS_GOOGLE_VERIFIER,
  REACT_APP_TORUS_TWITTER_VERIFIER,
  REACT_APP_TORUS_TWITTER_CLIENT_ID,
  REACT_APP_TORUS_AUTH_DOMAIN,
  REACT_APP_TORUS_PROXY_CONTRACT,
  REACT_APP_TORUS_PROVIDERS_REDIRECT_URL,
  REACT_APP_WS_AUTH_CHALLENGE_URL,
  REACT_APP_TORUS_GOOGLE_CLIENT_ID,
  REACT_APP_TORUS_PASSWORDLESS_VERIFIER,
  REACT_APP_TORUS_PASSWORDLESS_CLIENT_ID,
  REACT_APP_TEXTILE_HUB_ADDRESS,
  REACT_APP_VAULT_SERVICE_URL,
  REACT_APP_VAULT_SERVICE_SALT_SECRET,
} = process.env;

export default {
  textileHubAddres: REACT_APP_TEXTILE_HUB_ADDRESS,
  vault: {
    serviceUrl: REACT_APP_VAULT_SERVICE_URL,
    saltSecret: REACT_APP_VAULT_SERVICE_SALT_SECRET,
  },
  ws: {
    url: REACT_APP_WS_AUTH_CHALLENGE_URL,
  },
  torus: {
    sdkConfig: pickBy({
      enableLogging: NODE_ENV !== 'production',
      redirectPathName: 'redirect.html',
      baseUrl: REACT_APP_TORUS_PROVIDERS_REDIRECT_URL,
      proxyContractAddress: REACT_APP_TORUS_PROXY_CONTRACT, // details for test net
      network: REACT_APP_TORUS_NETWORK, // details for test net
    }, identity),
    providers: {
      google: {
        name: 'Google',
        typeOfLogin: 'google',
        jwtParams: {},
        verifier: REACT_APP_TORUS_GOOGLE_VERIFIER,
        clientId: REACT_APP_TORUS_GOOGLE_CLIENT_ID,
      },
      twitter: {
        name: 'Twitter',
        typeOfLogin: 'twitter',
        verifier: REACT_APP_TORUS_TWITTER_VERIFIER,
        clientId: REACT_APP_TORUS_TWITTER_CLIENT_ID,
        jwtParams: {
          domain: REACT_APP_TORUS_AUTH_DOMAIN,
        },
      },
      passwordless: {
        name: 'Passwordless',
        typeOfLogin: 'passwordless',
        verifier: REACT_APP_TORUS_PASSWORDLESS_VERIFIER,
        clientId: REACT_APP_TORUS_PASSWORDLESS_CLIENT_ID,
        jwtParams: {
          domain: REACT_APP_TORUS_AUTH_DOMAIN,
        },
      },
    },
  },
};
