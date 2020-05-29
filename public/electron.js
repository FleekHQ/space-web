require('dotenv').config()

const path = require('path');
const electron = require('electron');
const isDev = require('electron-is-dev');

const registerEvents = require('./events');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;
let destroyStream = () => {};
const isMac = process.platform === "darwin";

const createWindow = () => {
  const url = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 680,
    minWidth: 680,
    minHeight: 500,
    titleBarStyle: isMac ? 'hiddenInset' : undefined,
    webPreferences: {
      nodeIntegration: true,
      preload: `${__dirname}/preload.js`
    }
  });

  mainWindow.loadURL(url);

  if (isDev) {
    // Add ReactDevTools
    if (process.env.REACT_EXTENSION_PATH) {
      BrowserWindow.addDevToolsExtension(process.env.REACT_EXTENSION_PATH);
    }

    // Add ReduxDevTools
    if (process.env.REDUX_EXTENSION_PATH) {
      BrowserWindow.addDevToolsExtension(process.env.REDUX_EXTENSION_PATH);
    }

    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => (mainWindow = null));

  destroyStream = registerEvents(mainWindow);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  destroyStream();

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!mainWindow) {
    createWindow();
  }
});
