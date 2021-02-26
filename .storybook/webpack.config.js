const path = require('path');

module.exports = ({ config }) => {
  config.node = {
    fs: 'empty',
  };

  config.resolve.alias = {
    ...config.resolve.alias,
    '@ui': path.resolve(process.cwd(), 'src', 'UI'),
    '@config': path.resolve(process.cwd(), 'src', 'config'),
    '@shared': path.resolve(process.cwd(), 'src', 'shared'),
    '@events': path.resolve(process.cwd(), 'src', 'events'),
    '@utils': path.resolve(process.cwd(), 'src', 'utils'),
    '@reducers': path.resolve(process.cwd(), 'src', 'reducers'),
    '@clients': path.resolve(process.cwd(), 'src', 'clients'),
  };

  return config;
};
