import { formatBytes } from '@utils';

const formatUsageData = (localUsage, backupUsage) => {
  const localUsageFormatted = {
    using: formatBytes(localUsage.using),
    storage: formatBytes(localUsage.storage),
    storagePercent: (localUsage.storage / (localUsage.storage + localUsage.transfer)) * 100,
    transfer: formatBytes(localUsage.transfer),
    transferPercent: (localUsage.transfer / (localUsage.storage + localUsage.transfer)) * 100,
  };

  const backupUsageFormatted = {
    using: formatBytes(backupUsage.using),
    maxUsing: formatBytes(backupUsage.maxUsing),
    storage: formatBytes(backupUsage.storage),
    storagePercent: (backupUsage.storage / (backupUsage.storage + backupUsage.transfer)) * 100,
    transfer: formatBytes(backupUsage.transfer),
    transferPercent: (backupUsage.transfer / (backupUsage.storage + backupUsage.transfer)) * 100,
  };

  return {
    localUsageFormatted,
    backupUsageFormatted,
  };
};

export default formatUsageData;
