const path = require('path');
const isDev = require('electron-is-dev');
const { ipcMain, BrowserWindow } = require('electron');
const qs = require('query-string');

const EVENT_PREFIX = 'modal';
const OPEN_EVENT = `${EVENT_PREFIX}:open`;
const CLOSE_EVENT = `${EVENT_PREFIX}:close`;

let modalWindow;

const registerModalEvents = (mainWindow) => {
  ipcMain.on(OPEN_EVENT, (event, payload = {}) => {
    const {
      route,
      query,
      ...windowProps
    } = payload;

    const baseUrl = isDev
      ? 'http://localhost:3000/#'
      : `file://${path.join(__dirname, '../../build/index.html#')}`;

    modalWindow = new BrowserWindow({
      parent: mainWindow,
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true,
        preload: path.resolve(__dirname, '..', '..', 'preload.js'),
      },
      ...windowProps,
    });

    const url = `${baseUrl}${route}?${qs.stringify(query)}`;

    modalWindow.loadURL(url);

    modalWindow.on('closed', () => {
      modalWindow = null;
    });
  });

  ipcMain.on(CLOSE_EVENT, () => {
    if (mainWindow && modalWindow.close) {
      modalWindow.close();
    }
  });
};

module.exports = registerModalEvents;
