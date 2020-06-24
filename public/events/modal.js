const path = require('path');
const isDev = require('electron-is-dev');
const { ipcMain, BrowserWindow } = require('electron');

const EVENT_PREFIX = 'modal';
const OPEN_EVENT = `${EVENT_PREFIX}:open`;

let modalWindow;

const registerModalEvents = (mainWindow) => {
  ipcMain.on(OPEN_EVENT, (event, payload = {}) => {
    const {
      route,
      ...windowProps
    } = payload;

    const url = isDev
      ? 'http://localhost:3000/#'
      : `file://${path.join(__dirname, '../../build/index.html#')}`;

    modalWindow = new BrowserWindow({
      parent: mainWindow,
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true,
        preload: path.resolve(__dirname, '..', 'preload.js'),
      },
      ...windowProps,
    });

    modalWindow.loadURL(url + route);

    modalWindow.on('closed', () => {
      modalWindow = null;
    });
  });
};

module.exports = registerModalEvents;
