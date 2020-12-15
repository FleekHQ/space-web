import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link as ReactRouterLink, useHistory, useLocation } from 'react-router-dom';
import { faExclamationTriangle } from '@fortawesome/pro-regular-svg-icons/faExclamationTriangle';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import config from '@config';
import { signin } from '@events';
import { SIGNIN_ACTION_TYPES } from '@reducers/auth/signin';
import ThirdPartyAuth from '@shared/components/ThirdPartyAuth';
import PasswordLessForm from '@shared/components/PasswordLessForm';
import { useTorusSdk, useAuth0Passwordless, useWsChallenge } from '@utils';

import Splash from '../../Splash';

import useStyles from './styles';

const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState(null);
  const siginState = useSelector((s) => s.auth.signin);
  const [showSplash, setShowSplash] = React.useState(false);
  const { checkIdentityByEthKey } = useWsChallenge();
  const { isInitializing, torusTriggerLogin } = useTorusSdk(config.torus.sdkConfig);
  const {
    getLoginPayload,
    sendPasswordlessEmail,
    loading: passwordlessLoading,
  } = useAuth0Passwordless();

  const handlePasswordLessFormSubmit = async ({ email }) => {
    const isSent = await sendPasswordlessEmail({
      email,
      from: 'signin',
    });

    if (isSent) {
      history.push({
        pathname: '/auth/email-link-auth',
        state: {
          email,
          from: 'signin',
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
    if (keyNotExists) {
      // TODO: user not found error message
      dispatch({
        error: 'modules.signin.errors.notFound',
        type: SIGNIN_ACTION_TYPES.ON_SUBMIT_ERROR,
      });
      return;
    }

    setShowSplash(true);
    signin({ torusRes });
  };

  /**
   * @param {string} errorKey
   */
  const handleThirdPartyAuthError = (errorKey) => {
    setShowSplash(false);
    dispatch({
      error: `modules.signin.errors.${errorKey}`,
      type: SIGNIN_ACTION_TYPES.ON_SUBMIT_ERROR,
    });
  };

  React.useEffect(() => {
    if (siginState.success) {
      history.push('/storage');
    }
  }, [siginState.success]);

  React.useEffect(() => {
    if (location.state && location.state.email) {
      setFormData(location.state);
    }

    return () => {
      dispatch({
        type: SIGNIN_ACTION_TYPES.ON_RESET,
      });
    };
  }, []);

  React.useEffect(() => {
    if (siginState.error) {
      setShowSplash(false);
    }
  }, [siginState.error]);

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
            // TODO: user is not signup
            dispatch({
              error: 'modules.signin.errors.noAccount',
              type: SIGNIN_ACTION_TYPES.ON_SUBMIT_ERROR,
            });
          } catch (error) {
            setShowSplash(false);

            let errorKey = 'torus';
            if (error.message.includes('Duplicate token found')) {
              errorKey = 'retry';
            }

            dispatch({
              error: `modules.signin.errors.${errorKey}`,
              type: SIGNIN_ACTION_TYPES.ON_SUBMIT_ERROR,
            });
          }
        };
        getTorusRes();
      }
    }
  }, [isInitializing]);

  return (
    <>
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
                {t('modules.signin.title')}
              </Box>
            </Typography>
            <Link
              component={ReactRouterLink}
              to={{
                pathname: '/auth/signup',
                state: formData,
              }}
            >
              <Box component="span" color="#006EFF" fontSize="14px">
                {t('modules.signup.title')}
              </Box>
            </Link>
          </Box>
          <Box mb="20px" width="100%">
            <PasswordLessForm
              isLoading={siginState.loading}
              submitBtnText={t('modules.signin.title')}
              defaultEmail={
                location.state
                && location.state.email ? location.state.email : undefined
              }
              onSubmit={handlePasswordLessFormSubmit}
              onChangeForm={(newFormData) => setFormData(newFormData)}
            />
          </Box>
          <Box color="common.white" textAlign="center">
            <Link to="/auth/forgot-password" component={ReactRouterLink} color="inherit" underline="always">
              <Box component="span" fontSize="10px">
                {t('modules.signin.forgotPassword')}
              </Box>
            </Link>
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
            isLoading={siginState.loading || passwordlessLoading}
            type={t('modules.signin.title')}
            onError={handleThirdPartyAuthError}
            onSuccess={handleThirdPartyAuthSuccess}
            onCancel={() => setShowSplash(false)}
            onStartLoading={() => setShowSplash(true)}
          />
        </Box>
        {
          siginState.error && (
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
                {t(siginState.error, { defaultValue: t('modules.signin.errors.generic') })}
              </Box>
            </Box>
          )
        }
      </Box>
    </>
  );
};

export default SignIn;
