import React from 'react';
import axios from 'axios';
import TorusSdk from '@toruslabs/torus-direct-web-sdk';

import config from '@config';

/**
 * @typedef {Object} UserInfo
 * @property {string?} email
 * @property {string?} nickname
 * @property {string} name
 * @property {string} idToken
 * @property {string} typeOfLogin
 * @property {string} accessToken
 *
 * @typedef {Object} TorusRes
 * @property {UserInfo} userInfo
 * @property {string} privateKey
 * @property {string} publicAddress
*/

/**
 * @param {TorusRes} torusRes
 */
const setTwitterNickname = async (torusRes) => {
  try {
    const { data } = await axios.get(`${config.torus.providers.twitter.jwtParams.domain}/userinfo`, {
      headers: {
        authorization: `Bearer ${torusRes.userInfo.accessToken}`,
      },
    });

    if (data && data.nickname) {
      // eslint-disable-next-line no-param-reassign
      torusRes.userInfo.nickname = data.nickname;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error when trying to get twitter nickname: ${error.message}`);
  }
};

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

        if (tRes.userInfo.typeOfLogin === 'twitter') {
          await setTwitterNickname(tRes);
        }

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
