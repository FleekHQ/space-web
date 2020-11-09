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
  const [state, setState] = React.useState({
    torusSdk: null,
    isInitializing: true,
  });

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
        jwtParams,
        typeOfLogin,
      } = config.torus.providers[provider];

      /** @type {TorusRes} */
      const tRes = await state.torusSdk.triggerLogin({
        name,
        verifier,
        clientId,
        jwtParams,
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

      throw error;
    }
  };

  React.useEffect(() => {
    const torusdirectsdk = new TorusSdk(config.torus.sdkConfig);

    const initTorusSdk = async () => {
      await torusdirectsdk.init({ skipSw: true });
      setState({
        isInitializing: false,
        torusSdk: torusdirectsdk,
      });
    };

    initTorusSdk();
  }, []);

  return {
    torusTriggerLogin,
    isInitializing: state.isInitializing,
  };
}
