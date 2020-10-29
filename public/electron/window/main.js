const url = require('url');
const path = require('path');
const isDev = require('electron-is-dev');
const { BrowserWindow } = require('electron');

const isMac = process.platform === 'darwin';

const createWindow = () => {
  const fileUrl = url.format({
    protocol: 'file',
    hash: 'splash',
    pathname: path.resolve(__dirname, '../../../build/index.html'),
  });

  const splashUrl = isDev
    ? 'http://localhost:3000/#/splash'
    : fileUrl;

  const win = new BrowserWindow({
    width: 644,
    height: 644,
    minWidth: 644,
    minHeight: 400,
    backgroundColor: '#000000',
    titleBarStyle: isMac ? 'hiddenInset' : undefined,
    icon: path.join(__dirname, '..', '..', 'icon.png'),
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      preload: path.join(__dirname, '..', '..', 'preload.js'),
    },
  });

  win.loadURL(splashUrl);

  if (isDev) {
    // Add ReactDevTools
    if (process.env.REACT_EXTENSION_PATH) {
      BrowserWindow.addDevToolsExtension(process.env.REACT_EXTENSION_PATH);
    }

    // Add ReduxDevTools
    if (process.env.REDUX_EXTENSION_PATH) {
      BrowserWindow.addDevToolsExtension(process.env.REDUX_EXTENSION_PATH);
    }

    win.webContents.openDevTools();
  }

  return win;
};

module.exports = createWindow;
