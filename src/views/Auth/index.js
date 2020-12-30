import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import config from '@config';
import { signup, signin } from '@events';
import { SIGNUP_ACTION_TYPES } from '@reducers/auth/signup';
import { useTorusSdk, useAuth0Passwordless, useWsChallenge } from '@utils';

import Layout from './components/Layout';
import Separator from './components/Separator';
import EmailAuth from './components/EmailAuth';
import ErrorMessage from './components/ErrorMessage';
import SocialNetworksAuth from './components/SocialNetworksAuth';
import Splash from '../Splash';

import useStyles from './styles';

const Auth = () => {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { checkIdentityByEthKey } = useWsChallenge();
  const { isInitializing, torusTriggerLogin } = useTorusSdk(config.torus.sdkConfig);
  const {
    getLoginPayload,
    sendPasswordlessEmail,
    loading: passwordlessLoading,
  } = useAuth0Passwordless();

  const [showSplash, setShowSplash] = React.useState(false);
  const state = useSelector((s) => ({
    ...s.auth.signup,
    error: s.auth.signup.error || s.auth.signin.error,
    success: s.auth.signup.success || s.auth.signin.success,
    loading: s.auth.signup.loading || s.auth.signin.loading,
  }));

  const currentView = match.params[0];

  const handlePasswordLessFormSubmit = async ({ email }) => {
    const isSent = await sendPasswordlessEmail({
      email,
      from: currentView,
    });

    if (isSent) {
      history.push({
        pathname: '/magic-link',
        state: {
          email,
          from: currentView,
        },
      });
    }
  };

  /**
   * @param {Object} payload
   * @param {Boolean=} payload.keyNotExists
   * @param {import('../../../utils/use-torus-sdk').TorusRes} payload.torusRes
   */
  const handleThirdPartyAuthSuccess = ({ torusRes, keyNotExists }) => {
    setShowSplash(true);
    if (keyNotExists) {
      signup({
        torusRes,
      });
      return;
    }

    signin({ torusRes });
  };

  /**
   * @param {string} errorKey
   */
  const handleThirdPartyAuthError = (errorKey) => {
    setShowSplash(false);
    dispatch({
      error: `modules.signup.errors.${errorKey}`,
      type: SIGNUP_ACTION_TYPES.ON_SUBMIT_ERROR,
    });
  };

  React.useEffect(() => {
    if (state.success) {
      history.push('/storage');
    }
  }, [state.success]);

  React.useEffect(() => {
    if (location.hash) {
      setShowSplash(true);

      if (!isInitializing) {
        const getTorusRes = async () => {
          const { hash, stateFields } = getLoginPayload();

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
              signin({
                torusRes,
              });
              return;
            }

            signup({ torusRes });
          } catch (error) {
            setShowSplash(false);

            let errorKey = 'torus';
            if (error.message.includes('Duplicate token found')) {
              errorKey = 'retry';
            }

            dispatch({
              error: `modules.signup.errors.${errorKey}`,
              type: SIGNUP_ACTION_TYPES.ON_SUBMIT_ERROR,
            });
          }
        };
        getTorusRes();
      }
    }
  }, [isInitializing]);

  React.useEffect(() => {
    if (state.error) {
      setShowSplash(false);
    }
  }, [state.error]);

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
            width={{
              xs: 247,
              md: 580,
            }}
            flexDirection={{
              xs: 'column',
              md: 'row',
            }}
          >
            <EmailAuth
              currentView={currentView}
              isLoading={state.loading || passwordlessLoading}
              submitBtnText={t(`modules.${currentView}.title`)}
              defaultEmail={
                location.state
                && location.state.email ? location.state.email : undefined
              }
              onSubmit={handlePasswordLessFormSubmit}
            />
            <Separator />
            <SocialNetworksAuth
              isLoading={state.loading}
              type={t(`modules.${currentView}.title`)}
              onError={handleThirdPartyAuthError}
              onCancel={() => setShowSplash(false)}
              onSuccess={handleThirdPartyAuthSuccess}
              onStartLoading={() => setShowSplash(true)}
            />
            {
              state.error && (
                <ErrorMessage
                  message={t(state.error, { defaultValue: t('modules.signup.errors.generic') })}
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
