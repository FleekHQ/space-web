import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const SignUp = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.signinRoot}>
      <div className={classes.buttonGroup}>
        <Button
          fullWidth
          type="button"
          variant="contained"
          classes={{
            root: classes.buttonRoot,
            contained: classes.buttonContained,
          }}
        >
          {t('modules.signin.withUsername')}
        </Button>
        <Button
          fullWidth
          type="button"
          variant="outlined"
          classes={{
            root: classes.buttonRoot,
            outlined: classes.buttonOutlined,
          }}
        >
          {t('modules.signin.withPrivateKey')}
        </Button>
      </div>
      <Typography
        color="inherit"
        to="/auth/signup"
        component={Link}
        className={classes.link}
      >
        {t('modules.signin.link')}<strong>&nbsp;{t('modules.signup.title')}</strong>
      </Typography>
    </div>
  );
};

export default SignUp;
