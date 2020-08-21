import React from 'react';
import PropTypes from 'prop-types';
import { Trans, useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwitchButton from '@shared/components/SwitchButton';
import UsageBars from '@ui/UsageBars';
import palette from '@ui/theme/palette';
import formatUsageData from './format-usage-data';
import { UpgradeAccount, BackupBenefits, BackupLimit } from './components/InfoBoxes';

import useStyles from './styles';
import { BaseCard, Header, Section } from '../../components';

const getUsageComponent = (size, isShownMaxSize, maxSize) => (
  <Typography variant="body2" color="secondary">
    <Trans
      i18nKey={`modals.settings.usage.${isShownMaxSize ? 'usingOf' : 'using'}`}
      values={{ size, maxSize }}
      components={[<Box color="text.primary" component="span" />]}
    />
  </Typography>
);

const Usage = ({
  setBackupStorage,
  backupStorage,
  isFreePlan,
  planName,
  localUsage,
  backupUsage,
  showInfo,
}) => {
  const classes = useStyles({ backupStorage });
  const { t } = useTranslation();
  const switchBtnI18n = {
    enable: t('common.on'),
    disable: t('common.off'),
  };
  const { localUsageFormatted, backupUsageFormatted } = formatUsageData(
    localUsage,
    backupUsage,
  );

  return (
    <div>
      <BaseCard className={classes.localUsageContainer}>
        <Header>
          <div className={classes.usageBarsWrapper}>
            <UsageBars
              title={t('modals.settings.usage.local.diagramTitle')}
              borderColor={palette.palette.blue4}
              items={[
                {
                  key: 'storage',
                  text: t('modals.settings.usage.storage', {
                    size: localUsageFormatted.storage,
                  }),
                  color: palette.palette.blue1,
                  width: localUsageFormatted.storagePercent,
                },
                {
                  key: 'transfer',
                  text: t('modals.settings.usage.transferMonthly', {
                    size: localUsageFormatted.transfer,
                  }),
                  color: palette.palette.blue3,
                  width: localUsageFormatted.transferPercent,
                },
              ]}
              using={getUsageComponent(
                localUsageFormatted.using,
                false,
                localUsageFormatted.maxUsing,
              )}
            />
          </div>
        </Header>
      </BaseCard>
      <BaseCard className={classes.backupSwitchContainer}>
        <Header>
          <Section>
            <Typography variant="body1" weight="medium" component="span">
              <Trans
                i18nKey="modals.settings.usage.backup.switchTitle"
                values={{ value: backupStorage ? switchBtnI18n.enable : switchBtnI18n.disable }}
                components={[
                  <Box fontWeight="600" component="span" className={classes.backupValue} />,
                ]}
              />
            </Typography>
          </Section>
          <Section>
            <SwitchButton
              value={backupStorage ? 'on' : 'off'}
              onChange={setBackupStorage}
              i18n={switchBtnI18n}
            />
          </Section>
        </Header>
      </BaseCard>
      <BaseCard className={classes.backupDiagramContainer}>
        <Header>
          <div className={classes.usageBarsWrapper}>
            <UsageBars
              disabled={!backupStorage}
              title={t('modals.settings.usage.backup.diagramTitle', {
                size: backupUsageFormatted.maxUsing,
                plan: planName,
              })}
              borderColor={palette.palette.green3}
              items={[
                {
                  key: 'storage',
                  text: t('modals.settings.usage.storage', {
                    size: backupUsageFormatted.storage,
                  }),
                  color: palette.palette.green2,
                  width: backupUsageFormatted.storagePercent,
                },
                {
                  key: 'transfer',
                  text: t('modals.settings.usage.transferMonthly', {
                    size: backupUsageFormatted.transfer,
                  }),
                  color: palette.palette.green4,
                  width: backupUsageFormatted.transferPercent,
                },
              ]}
              using={getUsageComponent(
                backupUsageFormatted.using,
                isFreePlan && backupStorage,
                backupUsageFormatted.maxUsing,
              )}
            />
            {showInfo === 'upgrade' && <UpgradeAccount />}
            {showInfo === 'backupBenefits' && <BackupBenefits />}
            {showInfo === 'backupLimit' && (
              <BackupLimit backupLimit={backupUsageFormatted.maxUsing} />
            )}
          </div>
        </Header>
      </BaseCard>
    </div>
  );
};

Usage.propTypes = {
  setBackupStorage: PropTypes.func.isRequired,
  backupStorage: PropTypes.bool.isRequired,
  isFreePlan: PropTypes.bool.isRequired,
  planName: PropTypes.string.isRequired,
  localUsage: PropTypes.shape({
    using: PropTypes.number.isRequired,
    storage: PropTypes.number.isRequired,
    transfer: PropTypes.number.isRequired,
  }).isRequired,
  backupUsage: PropTypes.shape({
    using: PropTypes.number.isRequired,
    maxUsing: PropTypes.number.isRequired,
    storage: PropTypes.number.isRequired,
    transfer: PropTypes.number.isRequired,
  }).isRequired,
  showInfo: PropTypes.oneOf([[undefined, 'upgrade', 'backupBenefits', 'backupLimit']]).isRequired,
};

export default Usage;
