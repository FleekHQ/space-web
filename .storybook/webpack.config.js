const path = require('path');

module.exports = ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@ui': path.resolve(process.cwd(), 'src', 'UI'),
    '@shared': path.resolve(process.cwd(), 'src', 'shared'),
  };

  return config;
};
