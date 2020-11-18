const spaceProtocol = 'space://';
const spaceRegex = /^space:\/\/.*/i;

const getRedirectPath = (args = []) => {
  const deepLink = args.find((arg) => spaceRegex.test(arg));

  if (deepLink) return decodeURIComponent(deepLink.replace(spaceProtocol, ''));
  return null;
};

module.exports = getRedirectPath;
