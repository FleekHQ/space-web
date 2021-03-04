import React from 'react';
import PropTypes from 'prop-types';
import LogRocket from 'logrocket';
import * as Sentry from '@sentry/react';
import SigninOptions from '@terminal-packages/space-ui/core/SigninOptions';
import Box from '@material-ui/core/Box';
import config from '@config';
import { useTorusSdk, useWsChallenge } from '@utils';

import useStyles from './styles';

const SocialNetworksAuth = ({
  onError,
  onCancel,
  onSuccess,
  isLoading,
  onStartLoading,
}) => {
  const classes = useStyles();
  const { checkIdentityByEthKey } = useWsChallenge();
  const { isInitializing, torusTriggerLogin } = useTorusSdk({
    ...config.torus.sdkConfig,
    redirectToOpener: true,
  });

  const [state, setState] = React.useState({
    loading: false,
    torusRes: null,
  });

  const handleTorusTriggerLogin = async (provider) => {
    const EVENT_NAME = 'torusTriggerLogin';
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
      const noDataErr = new Error('no data from torus response');
      Sentry.captureException(noDataErr);
      LogRocket.captureException(noDataErr, {
        tags: { event: EVENT_NAME },
      });
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
      Sentry.captureException(error);
      LogRocket.captureException(error, {
        tags: { event: EVENT_NAME },
      });
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
    <Box
      flex={1}
      maxWidth={270}
      mt={{
        xs: 0,
        md: '59px',
      }}
      height={163}
      className={classes.root}
    >
      <SigninOptions
        onClickOption={async (option) => {
          await handleTorusTriggerLogin(option.id);
        }}
        disabled={disabledOptions}
      />
    </Box>
  );
};

SocialNetworksAuth.defaultProps = {
  isLoading: false,
  onCancel: () => null,
  onStartLoading: () => null,
};

SocialNetworksAuth.propTypes = {
  isLoading: PropTypes.bool,
  onCancel: PropTypes.func,
  onStartLoading: PropTypes.func,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default SocialNetworksAuth;
