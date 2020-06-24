const path = require('path');
const isDev = require('electron-is-dev');
const { BrowserWindow } = require('electron');

const isMac = process.platform === 'darwin';

const createWindow = () => {
  const url = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../../../build/index.html')}`;

  const win = new BrowserWindow({
    width: 1200,
    height: 680,
    minWidth: 680,
    minHeight: 500,
    titleBarStyle: isMac ? 'hiddenInset' : undefined,
    icon: path.join(__dirname, '..', '..', 'icon.png'),
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      preload: path.join(__dirname, '..', '..', 'preload.js'),
    },
  });

  win.loadURL(url);

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
