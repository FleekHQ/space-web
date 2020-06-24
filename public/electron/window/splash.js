const path = require('path');
const { BrowserWindow } = require('electron');

const isMac = process.platform === 'darwin';

// TODO remove window buttons, add loading html file
const createWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    minWidth: 400,
    minHeight: 400,
    titleBarStyle: isMac ? 'hiddenInset' : undefined,
    icon: path.join(__dirname, '..', '..', 'icon.png'),
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      preload: path.join(__dirname, '..', '..', 'preload.js'),
    },
  });

  return win;
};

module.exports = createWindow;
