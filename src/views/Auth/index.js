import React from 'react';
import { useTranslation } from 'react-i18next';
import { openExternalLink } from '@events/shell';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/pro-regular-svg-icons/faExclamationTriangle';
import {
  useHistory,
  useLocation,
  useRouteMatch,
  Link as ReactRouterLink,
} from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import ThirdPartyAuth from '@shared/components/ThirdPartyAuth';
import PasswordLessForm from '@shared/components/PasswordLessForm';

import config from '@config';
import { signup, signin } from '@events';
import { SIGNIN_ACTION_TYPES } from '@reducers/auth/signin';
import { SIGNUP_ACTION_TYPES } from '@reducers/auth/signup';
import { useTorusSdk, useAuth0Passwordless, useWsChallenge } from '@utils';

import Splash from '../Splash';

import useStyles from './styles';

const PRIVACY_POLICY_URL = 'https://space.storage/privacy-policy';
const TERMS_OF_SERVICE_URL = 'https://space.storage/terms-of-service';

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
  const currentView = match.params[0];

  const [formData, setFormData] = React.useState(null);
  const [showSplash, setShowSplash] = React.useState(false);
  const state = useSelector((s) => ({
    ...s.auth.signup,
    error: s.auth.signup.error || s.auth.signin.error,
    success: s.auth.signup.success || s.auth.signin.success,
    loading: s.auth.signup.loading || s.auth.signin.loading,
  }));

  const handlePasswordLessFormSubmit = async ({ email }) => {
    const isSent = await sendPasswordlessEmail({
      email,
      from: 'signup',
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
    if (location.state && location.state.email) {
      setFormData(location.state);
    }

    return () => {
      dispatch({
        type: SIGNUP_ACTION_TYPES.ON_RESET,
      });
      dispatch({
        type: SIGNIN_ACTION_TYPES.ON_RESET,
      });
    };
  }, []);

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
    <div className={classes.root}>
      {
        showSplash && (
          <Box
            display="flex"
            width="100%"
            height="100vh"
            position="absolute"
            zIndex={2}
            justifyContent="center"
          >
            <Splash />
          </Box>
        )
      }
      <Box
        display="flex"
        width={580}
        height={288}
        position="relative"
        justifyContent="center"
      >
        <Box flex={1} maxWidth={247} display="inherit" flexDirection="column">
          <Box
            mb="31px"
            display="inherit"
            flexDirection="row"
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <Typography>
              <Box component="span" fontSize="24px" fontWeight={600} color="common.white">
                {t(`modules.${currentView}.title`)}
              </Box>
            </Typography>
            <Link
              component={ReactRouterLink}
              to={{
                pathname: currentView === 'signin' ? '/signup' : '/signin',
                state: formData,
              }}
            >
              <Box component="span" color="#006EFF" fontSize="14px">
                {t(`modules.${currentView === 'signin' ? 'signup' : 'signin'}.title`)}
              </Box>
            </Link>
          </Box>
          <Box mb="20px" width="100%">
            <PasswordLessForm
              isLoading={state.loading || passwordlessLoading}
              submitBtnText={t(`modules.${currentView}.title`)}
              defaultEmail={
                location.state
                && location.state.email ? location.state.email : undefined
              }
              onSubmit={handlePasswordLessFormSubmit}
              onChangeForm={(newFormData) => setFormData(newFormData)}
            />
          </Box>
          <Box maxWidth={192} color="#888888" textAlign="center" alignSelf="center">
            <Typography color="inherit">
              <Box component="span" fontSize="12px">
                {`${t('modules.signup.agreenment.part1')} `}
                <ButtonBase
                  component="a"
                  color="inherit"
                  className={classes.linkButton}
                  onClick={() => openExternalLink(PRIVACY_POLICY_URL)}
                >
                  {`${t('modules.signup.agreenment.privacy')}`}
                </ButtonBase>
                &nbsp;&&nbsp;
                <ButtonBase
                  component="a"
                  color="inherit"
                  className={classes.linkButton}
                  onClick={() => openExternalLink(TERMS_OF_SERVICE_URL)}
                >
                  {t('modules.signup.agreenment.terms')}
                </ButtonBase>
              </Box>
            </Typography>
          </Box>
        </Box>
        <Box mt="59px" mb="75px" mx="35px" display="flex" flexDirection="column" alignItems="center">
          <Box flex={1}>
            <Divider orientation="vertical" classes={{ root: classes.dividerRoot }} />
          </Box>
          <Box mt="8px" mb="10px">
            <Typography>
              <Box component="span" color="#5A5A5A">
                or
              </Box>
            </Typography>
          </Box>
          <Box flex={1}>
            <Divider light orientation="vertical" classes={{ root: classes.dividerRoot }} />
          </Box>
        </Box>
        <Box flex={1} maxWidth={247} mt="59px">
          <ThirdPartyAuth
            isLoading={state.loading}
            type={t(`modules.${currentView}.title`)}
            onError={handleThirdPartyAuthError}
            onCancel={() => setShowSplash(false)}
            onSuccess={handleThirdPartyAuthSuccess}
            onStartLoading={() => setShowSplash(true)}
          />
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
                {t(state.error, { defaultValue: t('modules.signup.errors.generic') })}
              </Box>
            </Box>
          )
        }
      </Box>
    </div>
  );
};

export default Auth;
