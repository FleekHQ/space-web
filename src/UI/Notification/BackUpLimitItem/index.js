import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { Trans, useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/pro-regular-svg-icons/faExclamationCircle';
import moment from 'moment';
import classnames from 'classnames';
import useStyles from './styles';

const BackUpLimitNotification = ({
  currentAmountText,
  limitText,
  timestamp,
  upgradeOnClick,
  logoUrl,
  highlighted,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const timeAgo = moment(timestamp).fromNow();

  return (
    <MenuItem
      disableRipple
      className={classnames(
        classes.root,
        {
          [classes.highlighted]: highlighted,
        },
      )}
    >
      <div className={classes.imgAndTitleContainer}>
        <img
          src={logoUrl}
          alt="space logo"
          className={classes.logo}
        />
        <div className={classes.titleContainer}>
          <Typography className={classes.title}>{t('notifications.backupLimit.title')}</Typography>
          <div className={classes.warningContainer}>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className={classes.icon}
            />
            <Typography className={classes.warningText}>{t('notifications.backupLimit.warning')}</Typography>
          </div>
        </div>
      </div>
      <div className={classes.sectionContainer}>
        <Typography
          className={classnames(classes.greyText, classes.usage)}
        >
          <Trans
            i18nKey="notifications.backupLimit.using"
            values={{
              current: currentAmountText,
              limit: limitText,
            }}
            components={[<span className={classes.emphasizedText}>BOLD</span>]}
          />
        </Typography>
        <Typography className={classnames(classes.greyText, classes.timestamp)}>
          {timeAgo}
        </Typography>
        <Button
          onClick={upgradeOnClick}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          {t('notifications.backupLimit.upgrade')}
        </Button>
      </div>
    </MenuItem>
  );
};

BackUpLimitNotification.defaultProps = {
  highlighted: false,
};

BackUpLimitNotification.propTypes = {
  currentAmountText: PropTypes.string.isRequired,
  limitText: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  upgradeOnClick: PropTypes.func.isRequired,
  logoUrl: PropTypes.string.isRequired,
  highlighted: PropTypes.bool,
};

export default BackUpLimitNotification;
