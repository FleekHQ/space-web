import React from 'react';
import PropTypes from 'prop-types';
import EthCrypto from 'eth-crypto';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';

import config from '@config';
import { useTorusSdk } from '@utils';

import Option from './Option';

import * as constants from './constants';

const ThirdPartyAuth = ({
  type,
  onError,
  onSuccess,
  isLoading,
}) => {
  const { t } = useTranslation();
  const { torusTriggerLogin } = useTorusSdk();
  const [state, setState] = React.useState({
    loading: false,
    torusRes: null,
  });

  const handleTorusTriggerLogin = (provider) => async (event) => {
    event.preventDefault();

    setState({
      loading: true,
      torusRes: null,
    });

    const tRes = await torusTriggerLogin({ provider });

    if (tRes) {
      setState((prevState) => ({
        ...prevState,
        torusRes: {
          ...tRes,
        },
      }));
      return;
    }

    setState({
      loading: false,
      torusRes: null,
    });

    onError();
  };

  React.useEffect(() => {
    let ws;

    if (state.torusRes) {
      ws = new WebSocket(config.ws.url);
      const publicKey = EthCrypto.publicKeyByPrivateKey(state.torusRes.privateKey);

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
            const sig = await EthCrypto.decryptWithPrivateKey(state.torusRes.privateKey, obj.value);

            ws.send(
              JSON.stringify({
                action: 'challenge',
                data: {
                  sig,
                  pubkey: publicKey,
                },
              }),
            );
          } else if (obj.type === 'ethToken') {
            if (obj.value && obj.value.address) {
              setState({
                ...state,
                loading: false,
              });
              onSuccess({
                torusRes: state.torusRes,
              });
              return;
            }

            // eslint-disable-next-line no-console
            console.error('Bad message from WS: ', obj);
          } else {
            if (obj.value && obj.value.message && obj.value.message.includes('not found')) {
              setState({
                ...state,
                loading: false,
              });
              onSuccess({
                keyNotExists: true,
                torusRes: state.torusRes,
              });
              return;
            }

            setState({
              ...state,
              loading: false,
            });
            // eslint-disable-next-line no-console
            console.error('Unexpected response: ', obj);
            onError({
              error: {
                message: 'Unexpected response',
              },
            });
          }
        } catch (error) {
          setState({
            ...state,
            loading: false,
          });
          // eslint-disable-next-line no-console
          console.error(`Unexpected response: ${error.message}`);
          onError({
            error,
          });
        }
      });
    }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [state.torusRes]);

  return (
    <>
      <Option
        type={type}
        disabled={state.loading || isLoading}
        text={`${type} with Google`}
        icon={<img alt="google" src={`${process.env.PUBLIC_URL}/assets/images/google.png`} />}
        onClick={handleTorusTriggerLogin('google')}
      />
      <Option
        disabled
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

ThirdPartyAuth.defaultProps = {
  isLoading: false,
};

ThirdPartyAuth.propTypes = {
  isLoading: PropTypes.bool,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  type: PropTypes.oneOf([constants.SIGNIN, constants.SIGNUP]).isRequired,
};

export default ThirdPartyAuth;
