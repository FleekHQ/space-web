import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@terminal-packages/space-ui/core/Button';
import { faLaptop } from '@fortawesome/pro-regular-svg-icons/faLaptop';
import { faShieldAlt } from '@fortawesome/pro-regular-svg-icons/faShieldAlt';

import MessageBox from '@ui/MessageBox';
import { WELCOME_ACTION_TYPES } from '@reducers/welcome';
import { openModal, SETTINGS_MODAL } from '@shared/components/Modal/actions';

import useStyles from './styles';

const handleSettingsModal = ({ dispatch }) => (event) => {
  event.preventDefault();

  dispatch(openModal(SETTINGS_MODAL, { defaultItem: event.currentTarget.id }));
};

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
    user,
    linkedAddresses,
  } = useSelector((s) => ({
    welcome: {
      ...s.welcome,
      hideUsername: s.welcome.hideUsername || s.user.username.length !== 0,
    },
    user: s.user,
    linkedAddresses: s.linkedAddresses,
  }));

  const showBackUpMessage = !linkedAddresses.loading && linkedAddresses.data.length === 0;

  if (welcome.hideBackup && welcome.hideUsername && welcome.hideIntegration) {
    return null;
  }

  // Delete this variable when we have integrated drive mounting
  // and want it to show up
  const disableDriveMountingModal = true;

  return (
    <div className={classes.rootWelcome}>
      {
        !welcome.hideBackup && showBackUpMessage && (
          <MessageBox
            bgColor="primary"
            icon={faShieldAlt}
            title={(
              <div className={classes.messageTitleContainer}>
                <Typography variant="body2" className={classes.title}>
                  {t('welcome.backup.title')}
                </Typography>
                <Typography variant="body2" color="textSecondary" className={classes.title}>
                  {t('common.highlyRecommended')}
                </Typography>
              </div>
            )}
          >
            <Typography variant="body2" color="textPrimary">
              {t('welcome.backup.description')}
            </Typography>
            <div className={classes.btnGroup}>
              <Button
                id="security"
                type="button"
                variant="primary"
                classes={{ root: classes.btn }}
                onClick={handleSettingsModal({ dispatch })}
              >
                {t('common.add')}
              </Button>
              <Button
                type="button"
                id="hideBackup"
                variant="text"
                classes={{ root: classes.btn }}
                onClick={handleDismiss({ dispatch })}
              >
                {t('common.remindMeLater')}
              </Button>
            </div>
          </MessageBox>
        )
      }
      {
        !welcome.hideUsername && !user.username && (
          <MessageBox title={t('welcome.username.title')} bgColor="secondary">
            <Typography variant="body2" color="textPrimary">
              {t('welcome.username.description')}
            </Typography>
            <div className={classes.btnGroup}>
              <Button
                id="account"
                type="button"
                variant="primary"
                classes={{ root: classes.btn }}
                onClick={handleSettingsModal({ dispatch })}
              >
                {t('common.create')}
              </Button>
              <Button
                type="button"
                variant="text"
                id="hideUsername"
                classes={{ root: classes.btn }}
                onClick={handleDismiss({ dispatch })}
              >
                {t('common.dismiss')}
              </Button>
            </div>
          </MessageBox>
        )
      }
      {
        !welcome.hideIntegration && !disableDriveMountingModal && (
          <MessageBox
            bgColor="secondary"
            icon={faLaptop}
            iconSize={12}
            title={(
              <div className={classes.messageTitleContainer}>
                <Typography variant="body2" className={classes.title}>
                  {t('welcome.integrations.title')}
                </Typography>
                <Typography variant="body2" color="textSecondary" className={classes.title}>
                  {t('common.highlyRecommended')}
                </Typography>
              </div>
            )}
          >
            <Typography variant="body2" color="textPrimary">
              {t('welcome.integrations.description')}
            </Typography>
            <div className={classes.btnGroup}>
              <Button
                id="usage"
                type="button"
                variant="primary"
                classes={{ root: classes.btn }}
                onClick={() => null}
              >
                {t('common.enable')}
              </Button>
              <Button
                type="button"
                variant="text"
                id="hideIntegration"
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
