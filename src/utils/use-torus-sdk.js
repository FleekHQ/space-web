import React from 'react';
import axios from 'axios';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
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

/**
 * @param {import('@toruslabs/torus-direct-web-sdk').DirectWebSDKArgs} sdkConfig
 */
export default function useTorusSdk(sdkConfig) {
  /**
   * @typedef {Object} State
   * @property {TorusSdk} torusSdk
   * @property {Boolean} isInitializing
   *
   * @type {[State, Function]} State
  */
  const [state, setState] = React.useState({
    torusSdk: null,
    isInitializing: true,
  });

  /**
   * Trigger torus login
   * @param {Object} payload
   * @param {string} payload.provider
   * @param {string=} payload.hash
   * @param {Object=} payload.extraJwtParams
   * @param {Object=} payload.queryParameters
   * @returns {TorusRes}
   */
  const torusTriggerLogin = async ({
    hash,
    provider,
    extraJwtParams,
    queryParameters,
  }) => {
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
      let tRes;

      if (process.env.REACT_APP_FE_NODE_ENV === 'production' && typeOfLogin === 'google') {
        tRes = await state.torusSdk.triggerAggregateLogin({
          verifierIdentifier: verifier,
          aggregateVerifierType: 'single_id_verifier',
          subVerifierDetailsArray: [
            {
              clientId,
              typeOfLogin,
              verifier: 'fleek',
            },
          ],
        });

        tRes = {
          ...tRes,
          userInfo: tRes.userInfo[0],
        };
      } else {
        tRes = await state.torusSdk.triggerLogin(pickBy({
          name,
          hash,
          verifier,
          clientId,
          typeOfLogin,
          queryParameters,
          jwtParams: {
            ...jwtParams,
            ...extraJwtParams,
          },
        }, identity));
      }

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
    const initTorusSdk = async () => {
      const torusSdk = new TorusSdk(sdkConfig);
      await torusSdk.init({ skipSw: true });

      setState({
        torusSdk,
        isInitializing: false,
      });
    };

    initTorusSdk();
  }, []);

  return {
    torusTriggerLogin,
    isInitializing: state.isInitializing,
  };
}
