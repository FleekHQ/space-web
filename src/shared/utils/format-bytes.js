const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = parseFloat(bytes / 1024 ** i).toFixed(decimals);

  return `${value} ${units[i]}`;
};

export default formatBytes;
