const path = require('path');
const isDev = require('electron-is-dev');
const { BrowserWindow } = require('electron');

const createWindow = () => {
  const url = isDev
    ? 'http://localhost:3000/#/splash'
    : `file://${path.join(__dirname, '../../../build/index.html#/splash')}`;

  const win = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    minWidth: 400,
    minHeight: 400,
    icon: path.join(__dirname, '..', '..', 'icon.png'),
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      preload: path.join(__dirname, '..', '..', 'preload.js'),
    },
  });

  win.loadURL(url);

  return win;
};

module.exports = createWindow;
