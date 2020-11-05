import React from 'react';
import PropTypes from 'prop-types';
// import EthCrypto from 'eth-crypto';
import { useTranslation } from 'react-i18next';
import TorusSdk from '@toruslabs/torus-direct-web-sdk';

import Box from '@material-ui/core/Box';

import config from '@config';
import { signin, signup } from '@events';
import Option from './Option';

import * as constants from './constants';

const ThirdPartyAuth = ({
  type,
}) => {
  const { t } = useTranslation();
  const [torus, setTorus] = React.useState(null);
  // const [torusRes, setTorusRes] = React.useState(null);

  const handleTorusTriggerLogin = (provider) => async (event) => {
    event.preventDefault();

    if (!config.torus.providers[provider]) {
      return;
    }

    const {
      name,
      verifier,
      clientId,
      typeOfLogin,
    } = config.torus.providers[provider];

    const torusRes = await torus.triggerLogin({
      name,
      verifier,
      clientId,
      typeOfLogin,
    });

    if (type === constants.SIGNIN) {
      signin({ torusRes });
      return;
    }

    signup({ torusRes });
  };

  React.useEffect(() => {
    const torusdirectsdk = new TorusSdk(config.torus.sdkConfig);

    const initTorusSdk = async () => {
      await torusdirectsdk.init({ skipSw: true });
      setTorus(torusdirectsdk);
    };

    initTorusSdk();
  }, []);

  /* React.useEffect(() => {
    let ws;

    if (torusRes) {
      const publicKey = EthCrypto.publicKeyByPrivateKey(`0x${torusRes.privateKey}`);

      ws = new WebSocket(config.ws.url);

      ws.addEventListener('open', () => {
        ws.send(
          JSON.stringify({
            action: 'ethToken',
            data: {
              pubkey: publicKey,
            },
          }),
        );
      });

      ws.addEventListener('message', async (event) => {
        try {
          const obj = JSON.parse(event.data);

          if (obj.type === 'challenge') {
            const sig = await EthCrypto.decryptWithPrivateKey(torusRes.privatekey, obj.value);

            ws.send(
              JSON.stringify({
                action: 'challenge',
                data: {
                  pubkey: publicKey,
                  sig,
                },
              }),
            );
          } else if (obj.type === 'ethToken') {
            // eslint-disable-next-line no-console
            console.log('received', obj);
          } else {
            if (obj.error && obj.error.includes('not found')) {
              console.log('Login');
              return;
            }
            // eslint-disable-next-line no-console
            console.error('Unexpected response: ', obj);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`Unexpected response: ${error.message}`);
        }
      });
    }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [torusRes]); */

  return (
    <>
      <Option
        type={type}
        text={`${type} with Google`}
        icon={<img alt="google" src={`${process.env.PUBLIC_URL}/assets/images/google.png`} />}
        onClick={handleTorusTriggerLogin('google')}
      />
      <Option
        text={`${type} with Twitter`}
        icon={<img alt="twitter" src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`} />}
        onClick={handleTorusTriggerLogin('twitter')}
      />
      <Option
        disabled
        text={`${type} with Ethereum`}
        icon={<img alt="wallet-connect" src={`${process.env.PUBLIC_URL}/assets/images/walletconnect.png`} />}
        onClick={() => null}
      />
      <Box mt="-15px" pl="17px" display="flex" alignItems="flex-end">
        <img height={37} src={`${process.env.PUBLIC_URL}/assets/images/curved-arrow.png`} alt="curved-arrow" />
        <Box
          ml="5px"
          top={10}
          fontSize={14}
          component="span"
          color="common.white"
          fontFamily="Kalam"
          position="relative"
        >
          {t('common.comingSoon')}
        </Box>
      </Box>
    </>
  );
};

ThirdPartyAuth.propTypes = {
  type: PropTypes.oneOf([constants.SIGNIN, constants.SIGNUP]).isRequired,
};

export default ThirdPartyAuth;
