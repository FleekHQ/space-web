import React from 'react';
import TorusSdk from '@toruslabs/torus-direct-web-sdk';

import config from '@config';

/**
 * @typedef {Object} TorusRes
 * @property {Object} userInfo
 * @property {string} privateKey
 * @property {string} publicAddress
*/

export default function useTorusSdk() {
  const [torusSdk, setTorus] = React.useState(null);

  /**
   * Trigger torus login
   * @param {Object} payload
   * @param {string} payload.provider - Provider to trigger the login
   * @returns {TorusRes}
   */
  const torusTriggerLogin = async ({ provider }) => {
    if (!config.torus.providers[provider]) {
      return null;
    }

    try {
      const {
        name,
        verifier,
        clientId,
        typeOfLogin,
      } = config.torus.providers[provider];

      /** @type {TorusRes} */
      const tRes = await torusSdk.triggerLogin({
        name,
        verifier,
        clientId,
        typeOfLogin,
      });

      if (tRes) {
        tRes.privateKey = `0x${tRes.privateKey}`;
        return tRes;
      }

      return null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error when trying to get torus response: ${error.message}`);

      return null;
    }
  };

  React.useEffect(() => {
    const torusdirectsdk = new TorusSdk(config.torus.sdkConfig);

    const initTorusSdk = async () => {
      await torusdirectsdk.init({ skipSw: true });
      setTorus(torusdirectsdk);
    };

    initTorusSdk();
  }, []);

  return {
    torusTriggerLogin,
  };
}
