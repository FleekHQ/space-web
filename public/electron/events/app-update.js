const { dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

const registerAppUpdateEvents = ({
  app,
}) => {
  try {
    autoUpdater.checkForUpdates();

    autoUpdater.on('update-downloaded', () => {
      // eslint-disable-next-line no-console
      console.log('The last update of the space app was successfully downloaded.');

      const res = dialog.showMessageBoxSync({
        buttons: ['No', 'Yes'],
        message: 'New update available! Do you want to restart the app now to install it?',
      });

      if (res === 1) {
        // eslint-disable-next-line no-param-reassign
        app.newUpdate = true;
        autoUpdater.quitAndInstall();
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Errror when try to check for updates: ${error.message}`);
  }
};

module.exports = registerAppUpdateEvents;
