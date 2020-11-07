const { REACT_APP_FE_NODE_ENV } = process.env;

const config = {
  development: {
    ws: {
      url: 'wss://gqo1oqz055.execute-api.us-west-2.amazonaws.com/dev',
    },
    torus: {
      sdkConfig: {
        enableLogging: true,
        redirectToOpener: true,
        redirectPathName: 'redirect.html',
        baseUrl: 'https://floral-mountain-2401.on.fleek.co/',
        proxyContractAddress: '0x4023d2a0D330bF11426B12C6144Cfb96B7fa6183', // details for test net
        network: 'testnet', // details for test net
      },
      providers: {
        google: {
          name: 'Google',
          typeOfLogin: 'google',
          clientId: '480855465278-s0lcvq0m4hpn5hokhgs8s1ujfe3lbk4f.apps.googleusercontent.com',
          verifier: 'space-google-testnet',
        },
        twitter: {
          name: 'Twitter',
          typeOfLogin: 'twitter',
          clientId: 's2pA8qVTUgxkzRP7DgTfUJ7dS',
          verifier: 'torus-auth0-twitter-lrc',
        },
      },
    },
  },
  production: {
    ws: {
      url: 'wss://gqo1oqz055.execute-api.us-west-2.amazonaws.com/dev',
    },
    torus: {
      sdkConfig: {
        enableLogging: false,
        redirectToOpener: true,
        redirectPathName: 'redirect.html',
        baseUrl: 'https://floral-mountain-2401.on.fleek.co/',
        proxyContractAddress: '0x4023d2a0D330bF11426B12C6144Cfb96B7fa6183', // details for test net
        network: 'testnet', // details for test net
      },
      providers: {
        google: {
          name: 'Google',
          typeOfLogin: 'google',
          clientId: '480855465278-s0lcvq0m4hpn5hokhgs8s1ujfe3lbk4f.apps.googleusercontent.com',
          verifier: 'space-google-testnet',
        },
        twitter: {
          name: 'Twitter',
          typeOfLogin: 'twitter',
          clientId: 's2pA8qVTUgxkzRP7DgTfUJ7dS',
          verifier: 'torus-auth0-twitter-lrc',
        },
      },
    },
  },
};

export default config[REACT_APP_FE_NODE_ENV] || config.development;
