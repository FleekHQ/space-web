import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/pro-regular-svg-icons/faExclamationTriangle';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { signin } from '@events';
import { SIGNIN_ACTION_TYPES } from '@reducers/auth/signin';
import ThirdPartyAuth from '@shared/components/ThirdPartyAuth';
import UsernamePasswordForm from '@shared/components/UsernamePasswordForm';

import Splash from '../../Splash';

import useStyles from './styles';

const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const siginState = useSelector((s) => s.auth.signin);
  const [showSplash, setShowSplash] = React.useState(false);

  const handleUsernamePasswordFormSubmit = ({ username, password }) => {
    signin({
      username,
      password,
    });
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

  React.useEffect(() => (
    () => {
      dispatch({
        type: SIGNIN_ACTION_TYPES.ON_RESET,
      });
    }
  ), []);

  React.useEffect(() => {
    if (siginState.error) {
      setShowSplash(false);
    }
  }, [siginState.error]);

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
            <Link to="/auth/signup" component={NavLink}>
              <Box component="span" color="#006EFF" fontSize="14px">
                {t('modules.signup.title')}
              </Box>
            </Link>
          </Box>
          <Box mb="20px" width="100%">
            <UsernamePasswordForm
              isLoading={siginState.loading}
              submitBtnText={t('modules.signin.title')}
              onSubmit={handleUsernamePasswordFormSubmit}
            />
          </Box>
          <Box color="common.white" textAlign="center">
            <Link to="/auth/forgot-password" component={NavLink} color="inherit" underline="always">
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
            isLoading={siginState.loading}
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
