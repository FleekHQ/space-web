require('dotenv').config();

const path = require('path');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

const registerEvents = require('./events');

let mainWindow;
let destroyStream = () => {};
const isMac = process.platform === 'darwin';

const createWindow = () => {
  const url = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  // TODO: run daemon
  /* if (!isDev) {
    exec(path.join(process.resourcesPath, 'space-daemon'), (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(stdout);
      console.error(stderr);
    });
  } */

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 680,
    minWidth: 680,
    minHeight: 500,
    titleBarStyle: isMac ? 'hiddenInset' : undefined,
    icon: path.join(__dirname, '/icon.png'),
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      preload: `${__dirname}/preload.js`,
    },
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

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('close', (event) => {
    if (app.quitting || app.newUpdate) {
      mainWindow = null;
    } else {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  destroyStream = registerEvents({
    app,
    isDev,
    mainWindow,
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  destroyStream();

  if (process.platform !== 'darwin' || app.newUpdate) {
    app.quit();
  }
});

app.on('activate', () => {
  if (!mainWindow) {
    createWindow();
  } else {
    mainWindow.show();
  }
});

app.on('before-quit', () => {
  app.quitting = true;
});
