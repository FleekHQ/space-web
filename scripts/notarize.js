require('dotenv').config();
const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;

  if (
    process.env.CSC_IDENTITY_AUTO_DISCOVERY === 'false'
    || electronPlatformName !== 'darwin'
  ) {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  // eslint-disable-next-line consistent-return, no-return-await
  return await notarize({
    appBundleId: 'com.electron.space-app',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_PASSWORD,
  });
};
