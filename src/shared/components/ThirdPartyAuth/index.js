import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';

import { useTorusSdk, useWsChallenge } from '@utils';

import Option from './Option';

import * as constants from './constants';

const ThirdPartyAuth = ({
  type,
  onError,
  onCancel,
  onSuccess,
  isLoading,
  onStartLoading,
}) => {
  const { t } = useTranslation();
  const { isInitializing, torusTriggerLogin } = useTorusSdk();
  const { checkIdentityByEthKey } = useWsChallenge();
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

    try {
      onStartLoading();
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

      onError('noData');
    } catch (error) {
      setState({
        loading: false,
        torusRes: null,
      });

      if (error && error.message === 'user closed popup') {
        onCancel();
        return;
      }

      onError('torus');
    }
  };

  React.useEffect(() => {
    if (state.torusRes) {
      const checkIfIdentityExists = async () => {
        try {
          const { identityExists } = await checkIdentityByEthKey(state.torusRes);

          setState({
            ...state,
            loading: false,
          });
          onSuccess({
            torusRes: state.torusRes,
            keyNotExists: !identityExists,
          });
        } catch (error) {
          setState({
            ...state,
            loading: false,
          });
          onError(error.message);
        }
      };

      checkIfIdentityExists();
    }
  }, [state.torusRes]);

  const disabledOptions = state.loading || isLoading || isInitializing;

  return (
    <>
      <Option
        type={type}
        disabled={disabledOptions}
        text={`${type} with Google`}
        icon={<img alt="google" src={`${process.env.PUBLIC_URL}/assets/images/google.png`} />}
        onClick={handleTorusTriggerLogin('google')}
      />
      <Option
        disabled={disabledOptions}
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
  onCancel: () => null,
  onStartLoading: () => null,
};

ThirdPartyAuth.propTypes = {
  isLoading: PropTypes.bool,
  onCancel: PropTypes.func,
  onStartLoading: PropTypes.func,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  type: PropTypes.oneOf([constants.SIGNIN, constants.SIGNUP]).isRequired,
};

export default ThirdPartyAuth;
