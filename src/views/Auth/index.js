import React from 'react';
import config from '@config';
import Box from '@material-ui/core/Box';
import { signin, signup } from '@events';
import { useTranslation } from 'react-i18next';
import { AUTH_ACTION_TYPES } from '@reducers/auth';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useTorusSdk, useAuth0Passwordless, useWsChallenge } from '@utils';
import queryString from 'query-string';

import Splash from '../Splash';
import useStyles from './styles';
import Layout from './components/Layout';
import Separator from './components/Separator';
import EmailAuth from './components/EmailAuth';
import ErrorMessage from './components/ErrorMessage';
import SocialNetworksAuth from './components/SocialNetworksAuth';

const Auth = () => {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const state = useSelector((s) => s.auth);
  const { checkIdentityByEthKey } = useWsChallenge();
  const matchSmScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { isInitializing, torusTriggerLogin } = useTorusSdk(config.torus.sdkConfig);
  const {
    getLoginPayload,
    sendPasswordlessEmail,
    loading: passwordlessLoading,
  } = useAuth0Passwordless();

  const PRIVACY_POLICY_URL = 'https://space.storage/privacy-policy/';
  const TERMS_OF_SERVICE_URL = 'https://space.storage/terms-of-service/';

  const [showSplash, setShowSplash] = React.useState(false);

  const currentView = match.params[0];

  const handlePasswordLessFormSubmit = async ({ email }) => {
    dispatch({
      type: AUTH_ACTION_TYPES.ON_RESET,
    });

    const {
      redirect_to: redirectTo,
      temp_key: tempKey,
    } = queryString.parse(location.search);

    const { error, isSent } = await sendPasswordlessEmail({
      email,
      from: currentView,
      redirectTo,
      tempKey,
    });

    if (error) {
      dispatch({
        error: `modules.${match.params[0]}.errors.magicLink`,
        link: {
          to: 'signin',
          message: t(`modules.${match.params[0]}.signIn`),
        },
        type: AUTH_ACTION_TYPES.ON_AUTHENTICATION_ERROR,
      });
      return;
    }

    if (isSent) {
      history.push({
        pathname: '/magic-link',
        state: {
          email,
          from: currentView,
          tempKey,
        },
        search: location.search,
      });
    }
  };

  /**
   * @param {Object} payload
   * @param {Boolean=} payload.keyNotExists
   * @param {import('../../../utils/use-torus-sdk').TorusRes} payload.torusRes
   */
  const handleThirdPartyAuthSuccess = ({ torusRes, keyNotExists }) => {
    const { temp_key: tempKey } = queryString.parse(location.search);

    setShowSplash(true);
    if (keyNotExists) {
      dispatch(signup({
        torusRes,
        tempKey,
      }));
      return;
    }

    dispatch(signin({ torusRes }));
  };

  /**
   * @param {string} errorKey
   */
  const handleThirdPartyAuthError = (errorKey) => {
    setShowSplash(false);
    dispatch({
      error: `modules.signup.errors.${errorKey}`,
      type: AUTH_ACTION_TYPES.ON_AUTHENTICATION_ERROR,
    });
  };

  React.useEffect(() => {
    if (state.isAuthenticated) {
      if (location.hash) {
        const { stateFields } = getLoginPayload();
        if (stateFields.redirectTo) {
          history.replace(decodeURIComponent(stateFields.redirectTo));
          return;
        }
      }
      history.replace('/home');
    }
  }, [state.isAuthenticated]);

  React.useEffect(() => {
    if (location.hash) {
      setShowSplash(true);

      if (!isInitializing) {
        const getTorusRes = async () => {
          const { hash, stateFields } = getLoginPayload();
          const { tempKey } = stateFields;

          try {
            const torusRes = await torusTriggerLogin({
              hash,
              queryParameters: {},
              provider: 'passwordless',
              extraJwtParams: {
                login_hint: stateFields.email || '',
              },
            });

            const { identityExists } = await checkIdentityByEthKey(torusRes);

            if (identityExists) {
              dispatch(signin({
                torusRes,
              }));
              return;
            }

            dispatch(signup({ torusRes, tempKey }));
          } catch (error) {
            setShowSplash(false);

            let errorKey = 'torus';
            if (error.message.includes('Duplicate token found')) {
              errorKey = 'retry';
            }

            dispatch({
              error: `modules.signup.errors.${errorKey}`,
              type: AUTH_ACTION_TYPES.ON_AUTHENTICATION_ERROR,
            });
          }
        };
        getTorusRes();
      }
    }
  }, [isInitializing]);

  React.useEffect(() => {
    if (state.authenticatingError) {
      setShowSplash(false);
    }
  }, [state.authenticatingError]);

  React.useEffect(() => {
    dispatch({
      type: AUTH_ACTION_TYPES.ON_RESET,
    });
  }, [match.params[0]]);

  const privacyAndPolicy = (
    <Box maxWidth={192} color="#888888" textAlign="center" alignSelf="center">
      <Typography color="inherit">
        <Box component="span" fontSize="12px" fontFamily="Inter">
          {`${t('modules.signup.agreenment.part1')} `}
          <ButtonBase
            component="a"
            color="inherit"
            className={classes.linkButton}
            target="_blank"
            href={PRIVACY_POLICY_URL}
          >
            {`${t('modules.signup.agreenment.privacy')}`}
          </ButtonBase>
          &nbsp;&&nbsp;
          <ButtonBase
            component="a"
            color="inherit"
            className={classes.linkButton}
            target="_blank"
            href={TERMS_OF_SERVICE_URL}
          >
            {t('modules.signup.agreenment.terms')}
          </ButtonBase>
        </Box>
      </Typography>
    </Box>
  );

  return (
    <>
      {
        showSplash && (
          <Box
            display="flex"
            width="100%"
            height="100vh"
            position="absolute"
            zIndex={9999}
            justifyContent="center"
          >
            <Splash />
          </Box>
        )
      }
      <Layout>
        <div className={classes.root}>
          <Box
            display="flex"
            position="relative"
            justifyContent="center"
            className={classes.authContainer}
            width={{
              xs: 320,
              md: 740,
            }}
            flexDirection={{
              xs: 'column',
              md: 'row',
            }}
          >
            <Box flex={1} display="inherit" flexDirection="column">
              <EmailAuth
                currentView={currentView}
                isLoading={state.isAuthenticating || passwordlessLoading}
                submitBtnText={t(`modules.${currentView}.title`)}
                defaultEmail={
                  location.state
                  && location.state.email ? location.state.email : undefined
                }
                onSubmit={handlePasswordLessFormSubmit}
              />
              {!matchSmScreen && (currentView === 'signup') && privacyAndPolicy}
            </Box>
            <Separator />
            <SocialNetworksAuth
              isLoading={state.isAuthenticating}
              onError={handleThirdPartyAuthError}
              onCancel={() => setShowSplash(false)}
              onSuccess={handleThirdPartyAuthSuccess}
              onStartLoading={() => setShowSplash(true)}
            />
            {matchSmScreen && (currentView === 'signup') && (
              <Box
                display="flex"
                justifyContent="center"
                mt={{ xs: '30px', md: 0 }}
              >
                {privacyAndPolicy}
              </Box>
            )}
            {
              state.authenticatingError && (
                <ErrorMessage
                  message={t(state.authenticatingError, { defaultValue: t('modules.signup.errors.generic') })}
                  link={state.link}
                />
              )
            }
          </Box>
        </div>
      </Layout>
    </>
  );
};

export default Auth;
