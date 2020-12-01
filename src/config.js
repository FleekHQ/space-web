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
} = process.env;

export default {
  ws: {
    url: REACT_APP_WS_AUTH_CHALLENGE_URL,
  },
  torus: {
    sdkConfig: pickBy({
      enableLogging: NODE_ENV !== 'production',
      redirectToOpener: true,
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
    },
  },
};
