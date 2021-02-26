import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@terminal-packages/space-ui/core/Button';

import MessageBox from '@ui/MessageBox';
import { WELCOME_ACTION_TYPES } from '@reducers/welcome';

import useStyles from './styles';

const handleDismiss = ({ dispatch }) => (event) => {
  event.preventDefault();

  dispatch({
    key: event.currentTarget.id,
    type: WELCOME_ACTION_TYPES.ON_DISMISS,
  });
};

const WelcomeMessages = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    welcome,
  } = useSelector((s) => ({
    welcome: {
      ...s.welcome,
      hideUsername: s.welcome && (s.welcome.hideUsername || s.user.username.length !== 0),
    },
  }));

  if (welcome.hideBackup && welcome.hideUsername && welcome.hideIntegration) {
    return null;
  }

  return (
    <div className={classes.rootWelcome}>
      {
        !welcome.hideBeta && (
          <MessageBox title={t('welcome.beta.title')} bgColor="secondary">
            <Typography variant="body2" color="textPrimary">
              {t('welcome.beta.description')}
            </Typography>
            <div className={classes.btnGroup}>
              <Button
                type="button"
                variant="primary"
                id="hideBeta"
                classes={{ root: classes.btn }}
                onClick={handleDismiss({ dispatch })}
              >
                {t('common.dismiss')}
              </Button>
            </div>
          </MessageBox>
        )
      }
    </div>
  );
};

export default WelcomeMessages;
