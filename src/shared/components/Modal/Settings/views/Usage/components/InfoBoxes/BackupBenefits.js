import React from 'react';
import { useTranslation } from 'react-i18next';
import { faInfoCircle } from '@fortawesome/pro-solid-svg-icons/faInfoCircle';
import InfoBoxBase from './InfoBoxBase';

const UpgradeAccount = () => {
  const { t } = useTranslation();

  return (
    <InfoBoxBase
      icon={faInfoCircle}
      title={t('modals.settings.usage.info.backupBenefits.title')}
      message={t('modals.settings.usage.info.backupBenefits.message')}
      buttonText={t('modals.settings.usage.info.backupBenefits.confirm')}
    />
  );
};

export default UpgradeAccount;
