const log = require('electron-log');

const spaceProtocol = 'space://'
const spaceRegex = /^space:\/\/.*/i;

const getRedirectPath = (args = []) => {
  const deepLink = args.find((arg) => spaceRegex.test(arg));

  log.info('deepLink', deepLink);

  if (deepLink) return decodeURIComponent(deepLink.replace(spaceProtocol, ''));
  return null;
};

module.exports = getRedirectPath;
