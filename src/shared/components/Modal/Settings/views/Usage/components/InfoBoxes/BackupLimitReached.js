import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { faExclamationCircle } from '@fortawesome/pro-solid-svg-icons/faExclamationCircle';
import Typography from '@ui/Typography';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowLeft } from '@fortawesome/pro-light-svg-icons/faLongArrowLeft';
import { openModal, LICENSE_REGISTRATION } from '@shared/components/Modal/actions';
import InfoBoxBase from './InfoBoxBase';
import useStyles from './styles';

const BackupLimit = ({ backupLimit }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <InfoBoxBase
      warning
      icon={faExclamationCircle}
      title={t('modals.settings.usage.info.reachedLimit.title')}
      message={t('modals.settings.usage.info.reachedLimit.message', { backupLimit })}
      buttonText={t('modals.settings.usage.info.reachedLimit.confirm')}
      onClick={() => {
        dispatch(openModal(LICENSE_REGISTRATION));
      }}
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
