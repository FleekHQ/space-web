import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { faExclamationCircle } from '@fortawesome/pro-solid-svg-icons/faExclamationCircle';
import Typography from '@ui/Typography';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowLeft } from '@fortawesome/pro-light-svg-icons/faLongArrowLeft';
import InfoBoxBase from './InfoBoxBase';
import useStyles from './styles';

const BackupLimit = ({ backupLimit }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <InfoBoxBase
      warning
      icon={faExclamationCircle}
      title={t('modals.settings.usage.info.reachedLimit.title')}
      message={t('modals.settings.usage.info.reachedLimit.message', { backupLimit })}
      buttonText={t('modals.settings.usage.info.reachedLimit.confirm')}
    >
      <Button color="secondary">
        <Typography variant="body2" color="inherit">
          <FontAwesomeIcon icon={faLongArrowLeft} className={classes.longArrowIcon} />
          {t('modals.settings.usage.info.reachedLimit.openBrowser')}
        </Typography>
      </Button>
    </InfoBoxBase>
  );
};

BackupLimit.propTypes = {
  backupLimit: PropTypes.string.isRequired,
};

export default BackupLimit;
