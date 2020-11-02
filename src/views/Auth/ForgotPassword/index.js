import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/pro-regular-svg-icons/faKey';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ThirdPartyAuthOption from '@shared/components/ThirdPartyAuth/Option';

import useStyles from './styles';

const SignIn = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Box mt={0} mb="10px" component="h1" fontSize="24px" color="common.white">
        {t('modules.forgotPassword.title')}
      </Box>
      <Box mb="20px" maxWidth={247} fontSize={12} color="common.white">
        {t('modules.forgotPassword.description')}
      </Box>
      <Box className={classes.options}>
        <ThirdPartyAuthOption
          text={t('modules.forgotPassword.recover.google')}
          icon={<img alt="google" src={`${process.env.PUBLIC_URL}/assets/images/google.png`} />}
          onClick={() => null}
        />
        <ThirdPartyAuthOption
          text={t('modules.forgotPassword.recover.twitter')}
          icon={<img alt="twitter" src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`} />}
          onClick={() => null}
        />
        <ThirdPartyAuthOption
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
    </Box>
  );
};

export default SignIn;
