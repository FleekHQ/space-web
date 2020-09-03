import React from 'react';
import PropTypes from 'prop-types';
import { Trans, useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import SwitchButton from '@shared/components/SwitchButton';
import UsageBars from '@ui/UsageBars';
import palette from '@ui/theme/palette';
import formatUsageData from './format-usage-data';
import {
  UpgradeAccount,
  BackupBenefits,
  BackupLimitReaching,
  BackupLimitReached,
} from '../InfoBoxes';

import useStyles from './styles';
import { BaseCard, Header, Section } from '../../../../components';

const getUsageComponent = (size, isShownMaxSize, maxSize) => (
  <Typography variant="body2" color="secondary" component="span">
    <Trans
      i18nKey={`modals.settings.usage.${isShownMaxSize ? 'usingOf' : 'using'}`}
      values={{ size, maxSize }}
      components={[<Box color="text.primary" component="span" />]}
    />
  </Typography>
);

const Usage = ({
  // eslint-disable-next-line no-unused-vars
  loading,
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
              loading={loading}
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
                    size: localUsageFormatted.bandwidth,
                  }),
                  color: palette.palette.blue3,
                  width: localUsageFormatted.bandwidthPercent,
                },
              ]}
              using={getUsageComponent(
                localUsageFormatted.combinedUsage,
                false,
                localUsageFormatted.limit,
              )}
            />
          </div>
        </Header>
      </BaseCard>
      <BaseCard className={classes.backupSwitchContainer}>
        <Header>
          <Section>
            <Typography variant="body1" weight="medium" component="span">
              {loading ? <Skeleton width={150} /> : (
                <Trans
                  i18nKey="modals.settings.usage.backup.switchTitle"
                  values={{ value: backupStorage ? switchBtnI18n.enable : switchBtnI18n.disable }}
                  components={[
                    <Box fontWeight="600" component="span" className={classes.backupValue} />,
                  ]}
                />
              )}
            </Typography>
          </Section>
          <Section>
            {loading ? <Skeleton width={90} height={22} /> : (
              <SwitchButton
                value={backupStorage ? 'on' : 'off'}
                onChange={setBackupStorage}
                i18n={switchBtnI18n}
              />
            )}
          </Section>
        </Header>
      </BaseCard>
      <BaseCard className={classes.backupDiagramContainer}>
        <Header>
          <div className={classes.usageBarsWrapper}>
            <UsageBars
              loading={loading}
              disabled={!backupStorage}
              title={t('modals.settings.usage.backup.diagramTitle', {
                size: backupUsageFormatted.limit,
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
                    size: backupUsageFormatted.bandwidth,
                  }),
                  color: palette.palette.green4,
                  width: backupUsageFormatted.bandwidthPercent,
                },
              ]}
              using={getUsageComponent(
                backupUsageFormatted.combinedUsage,
                isFreePlan && backupStorage,
                backupUsageFormatted.limit,
              )}
            />
            {showInfo === 'upgrade' && <UpgradeAccount />}
            {showInfo === 'backupBenefits' && <BackupBenefits />}
            {showInfo === 'backupLimitReaching' && (
              <BackupLimitReaching backupLimit={backupUsageFormatted.limit} />
            )}
            {showInfo === 'backupLimitReached' && (
              <BackupLimitReached backupLimit={backupUsageFormatted.limit} />
            )}
          </div>
        </Header>
      </BaseCard>
    </div>
  );
};

Usage.defaultProps = {
  showInfo: undefined,
  backupStorage: false,
  isFreePlan: false,
  planName: '',
};

Usage.propTypes = {
  setBackupStorage: PropTypes.func.isRequired,
  backupStorage: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  isFreePlan: PropTypes.bool,
  planName: PropTypes.string,
  localUsage: PropTypes.shape({
    combinedUsage: PropTypes.number.isRequired,
    storage: PropTypes.number.isRequired,
    bandwidth: PropTypes.number.isRequired,
  }).isRequired,
  backupUsage: PropTypes.shape({
    combinedUsage: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    storage: PropTypes.number.isRequired,
    bandwidth: PropTypes.number.isRequired,
  }).isRequired,
  showInfo: PropTypes.oneOf([
    'upgrade',
    'backupBenefits',
    'backupLimitReaching',
    'backupLimitReached',
  ]),
};

export default Usage;
