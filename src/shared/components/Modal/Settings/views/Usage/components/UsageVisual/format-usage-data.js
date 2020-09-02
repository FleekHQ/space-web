import { formatBytes } from '@utils';

const formatUsageData = (localUsage, backupUsage) => {
  const localUsageFormatted = {
    combinedUsage: formatBytes(localUsage.combinedUsage),
    storage: formatBytes(localUsage.storage),
    storagePercent: (localUsage.storage / (localUsage.storage + localUsage.bandwidth)) * 100,
    bandwidth: formatBytes(localUsage.bandwidth),
    bandwidthPercent: (localUsage.bandwidth / (localUsage.storage + localUsage.bandwidth)) * 100,
  };

  const backupUsageFormatted = {
    combinedUsage: formatBytes(backupUsage.combinedUsage),
    limit: formatBytes(backupUsage.limit),
    storage: formatBytes(backupUsage.storage),
    storagePercent: (backupUsage.storage / (backupUsage.storage + backupUsage.bandwidth)) * 100,
    bandwidth: formatBytes(backupUsage.bandwidth),
    bandwidthPercent: (backupUsage.bandwidth / (backupUsage.storage + backupUsage.bandwidth)) * 100,
  };

  return {
    localUsageFormatted,
    backupUsageFormatted,
  };
};

export default formatUsageData;
