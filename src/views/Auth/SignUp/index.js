/* eslint-disable */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/pro-regular-svg-icons/faExclamationTriangle';
import { openExternalLink } from '@events/shell';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import ThirdPartyAuth from '@shared/components/ThirdPartyAuth';
import UsernamePasswordForm from '@shared/components/UsernamePasswordForm';

import { signup, signin } from '@events';
import { SIGNIN_ACTION_TYPES } from '@reducers/auth/signin';
import { SIGNUP_ACTION_TYPES } from '@reducers/auth/signup';

import Splash from '../../Splash';

import useStyles from './styles';

const PRIVACY_POLICY_URL = 'https://space.storage/privacy-policy';
const TERMS_OF_SERVICE_URL = 'https://space.storage/terms-of-service';

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showSplash, setShowSplash] = React.useState(false);
  const state = useSelector((s) => ({
    ...s.auth.signup,
    error: s.auth.signup.error || s.auth.signin.error,
    success: s.auth.signup.success || s.auth.signin.success,
    loading: s.auth.signup.loading || s.auth.signin.loading,
  }));

  const handleUsernamePasswordFormSubmit = ({ username, password }) => {
    signup({
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

  React.useEffect(() => (
    () => {
      dispatch({
        type: SIGNUP_ACTION_TYPES.ON_RESET,
      });
      dispatch({
        type: SIGNIN_ACTION_TYPES.ON_RESET,
      });
    }
  ), []);

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
          <Box display="inherit" flexDirection="row" alignItems="flex-end" mb="31px">
            <Typography>
              <Box component="span" fontSize="24px" fontWeight={600} color="common.white">
                {t('modules.signup.title')}
              </Box>
            </Typography>
            <Box ml="111px">
              <Link to="/auth/signin" component={NavLink}>
                <Box component="span" color="#006EFF" fontSize="14px">
                  {t('modules.signin.title')}
                </Box>
              </Link>
            </Box>
          </Box>
          <Box mb="20px" width="100%">
            <UsernamePasswordForm
              showPasswordTooltip
              isLoading={state.loading}
              submitBtnText={t('modules.signup.title')}
              onSubmit={handleUsernamePasswordFormSubmit}
            />
          </Box>
          <Box color="common.white" textAlign="center">
            <Typography color="inherit">
              <Box component="span" fontSize="10px" color="common.white">
                {`${t('modules.signup.agreenment.part1')} `}
                <ButtonBase
                  color="inherit"
                  className={classes.linkButton}
                  onClick={() => openExternalLink(PRIVACY_POLICY_URL)}
                >
                  {`${t('modules.signup.agreenment.privacy')}`}
                </ButtonBase>
                &nbsp;&&nbsp;
                <ButtonBase
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
            type={t('modules.signup.title')}
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
    </>
  );
};

export default SignUp;
