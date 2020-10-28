import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { signin } from '@events';
import { SIGNIN_ACTION_TYPES } from '@reducers/auth/signin';
import ThirdPartyAuth from '@shared/components/ThirdPartyAuth';
import UsernamePasswordForm from '@shared/components/UsernamePasswordForm';

import useStyles from './styles';

const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const siginState = useSelector((s) => s.auth.signin);

  const handleUsernamePasswordFormSubmit = ({ username, password }) => {
    signin({
      username,
      password,
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

  return (
    <Box display="flex" width={580}>
      <Box flex={1} maxWidth={247} display="inherit" flexDirection="column">
        <Box display="inherit" flexDirection="row" alignItems="flex-end" mb="31px">
          <Typography>
            <Box component="span" fontSize="24px" fontWeight={600} color="common.white">
              {t('modules.signin.title')}
            </Box>
          </Typography>
          <Box ml="111px">
            <Link to="/auth/signup" component={NavLink}>
              <Box component="span" color="#006EFF" fontSize="14px">
                {t('modules.signup.title')}
              </Box>
            </Link>
          </Box>
        </Box>
        <Box mb="20px" width="100%">
          <UsernamePasswordForm
            isLoading={siginState.loading}
            submitBtnText={t('modules.signin.title')}
            onSubmit={handleUsernamePasswordFormSubmit}
          />
        </Box>
        <Box color="common.white" textAlign="center">
          <Link to="/auth/forgot_password" component={NavLink} color="inherit" underline="always">
            <Box component="span" fontSize="10px">
              {t('modules.signin.forgotPassword')}
            </Box>
          </Link>
          {/* <Typography color="inherit">
            <Box component="span" fontSize="10px">
              By signing up, I agree to the <Link><Box component="span" color="common.white">
              Privacy</Box></Link> & <Link><Box component="span"
              color="common.white">Terms</Box></Link>
            </Box>
          </Typography> */}
        </Box>
      </Box>
      <Box mt="59px" mb="30px" mx="35px" display="flex" flexDirection="column" alignItems="center">
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
          type={t('modules.signin.title')}
          onEthClick={() => null}
          onGoogleClick={() => null}
          onTwitterClick={() => null}
        />
      </Box>
    </Box>
  );
};

export default SignIn;
