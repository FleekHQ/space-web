const spaceProtocol = 'space://'
const spaceRegex = /^space:\/\/.*/i;

const getRedirectPath = (args = []) => {
  const deepLink = args.find((arg) => spaceRegex.test(arg));

  console.log('deepLink', deepLink);

  if (deepLink) return decodeURIComponent(deepLink.replace(spaceProtocol, ''));
  return null;
};

module.exports = getRedirectPath;
