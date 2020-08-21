import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@ui/Typography';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowLeft } from '@fortawesome/pro-light-svg-icons/faLongArrowLeft';
import { faArrowCircleUp } from '@fortawesome/pro-solid-svg-icons/faArrowCircleUp';
import InfoBoxBase from './InfoBoxBase';
import useStyles from './styles';

const UpgradeAccount = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <InfoBoxBase
      icon={faArrowCircleUp}
      title={t('modals.settings.usage.info.upgrade.title')}
      message={t('modals.settings.usage.info.upgrade.message')}
      buttonText={t('modals.settings.usage.info.upgrade.confirm')}
    >
      <Button color="secondary">
        <Typography variant="body2" color="inherit">
          <FontAwesomeIcon icon={faLongArrowLeft} className={classes.longArrowIcon} />
          {t('modals.settings.usage.info.upgrade.openBrowser')}
        </Typography>
      </Button>
    </InfoBoxBase>
  );
};

export default UpgradeAccount;
