import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import useStyles from './styles';

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <div className={classes.signinRoot}>
      <div className={classes.buttonGroup}>
        <Button
          fullWidth
          type="button"
          color="primary"
          variant="contained"
          onClick={() => history.push('/auth/singup')}
          classes={{
            root: classes.buttonRoot,
          }}
        >
          {t('modules.signin.createAnAccount')}
        </Button>
        <Button
          fullWidth
          type="button"
          variant="outlined"
          onClick={() => history.push('/auth/signin/username')}
          classes={{
            root: classes.buttonRoot,
            outlined: classes.buttonOutlined,
          }}
        >
          {t('modules.signin.login')}
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
