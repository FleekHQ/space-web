import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/pro-regular-svg-icons/faKey';
import { faExclamationTriangle } from '@fortawesome/pro-regular-svg-icons/faExclamationTriangle';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ThirdPartyAuthOption from '@shared/components/ThirdPartyAuth/Option';

import { signin } from '@events';
import { useTorusSdk, useWsChallenge } from '@utils';
import { SIGNIN_ACTION_TYPES } from '@reducers/auth/signin';

import useStyles from './styles';

const ForgotPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isInitializing, torusTriggerLogin } = useTorusSdk();
  const { checkIdentityByEthKey } = useWsChallenge();
  const signinState = useSelector((s) => s.auth.signin);
  const [state, setState] = React.useState({
    error: null,
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
        error: 'modules.forgotPassword.errors.noData',
      });
    } catch (error) {
      const newState = {
        loading: false,
      };

      if (error && error.message !== 'user closed popup') {
        newState.error = 'modules.forgotPassword.errors.torus';
      }

      setState(newState);
    }
  };

  React.useEffect(() => (
    () => {
      dispatch({
        type: SIGNIN_ACTION_TYPES.ON_RESET,
      });
    }
  ), []);

  React.useEffect(() => {
    if (state.loading) {
      dispatch({
        type: SIGNIN_ACTION_TYPES.ON_RESET,
      });
    }
  }, [state.loading]);

  React.useEffect(() => {
    if (signinState.error) {
      setState((prevState) => ({
        ...prevState,
        error: 'modules.forgotPassword.errors.signin',
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        error: null,
      }));
    }
  }, [signinState.error]);

  React.useEffect(() => {
    if (signinState.success) {
      history.push('/auth/create-password');
    }
  }, [signinState.success]);

  React.useEffect(() => {
    if (state.torusRes) {
      const checkIfIdentityExists = async () => {
        try {
          const { identityExists } = await checkIdentityByEthKey(state.torusRes);
          const newState = {
            ...state,
            loading: false,
          };

          if (!identityExists) {
            newState.error = 'notFound';
          } else {
            signin({ torusRes: state.torusRes });
          }

          setState(newState);
        } catch (error) {
          setState({
            ...state,
            loading: false,
            error: `modules.forgotPassword.errors.${error.message}`,
          });
        }
      };

      checkIfIdentityExists();
    }
  }, [state.torusRes]);

  const disabledOptions = state.loading || signinState.loading;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      position="relative"
      height={380}
    >
      <Box mt={0} mb="10px" component="h1" fontSize="24px" color="common.white">
        {t('modules.forgotPassword.title')}
      </Box>
      <Box mb="20px" maxWidth={247} fontSize={12} color="common.white">
        {t('modules.forgotPassword.description')}
      </Box>
      <Box className={classes.options}>
        <ThirdPartyAuthOption
          disabled={disabledOptions || isInitializing}
          text={t('modules.forgotPassword.recover.google')}
          icon={<img alt="google" src={`${process.env.PUBLIC_URL}/assets/images/google.png`} />}
          onClick={handleTorusTriggerLogin('google')}
        />
        <ThirdPartyAuthOption
          disabled={disabledOptions || isInitializing}
          text={t('modules.forgotPassword.recover.twitter')}
          icon={<img alt="twitter" src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`} />}
          onClick={handleTorusTriggerLogin('twitter')}
        />
        <ThirdPartyAuthOption
          disabled={disabledOptions}
          text={t('modules.forgotPassword.recover.key')}
          icon={<FontAwesomeIcon className={classes.keyIcon} icon={faKey} />}
          onClick={() => history.push('/auth/forgot-password/restore-keys-mnemonic')}
        />
      </Box>
      <Box textAlign="center" color="common.white">
        <Link
          underline="hover"
          to="/auth/signin"
          color="inherit"
          component={NavLink}
        >
          {t('common.goBack')}
        </Link>
      </Box>
      {
        state.error && (
          <Box
            pl="10px"
            pr="14px"
            bottom={0}
            border={1}
            height={33}
            display="flex"
            color="#EF6A6E"
            borderRadius={4}
            bgcolor="#240F10"
            alignSelf="center"
            position="absolute"
            alignItems="center"
            borderColor="#EF6A6E"
          >
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <Box ml="7px" component="span" color="common.white">
              {t(state.error, { defaultValue: t('modules.forgotPassword.errors.generic') })}
            </Box>
          </Box>
        )
      }
    </Box>
  );
};

export default ForgotPassword;
