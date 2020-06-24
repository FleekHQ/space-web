require('dotenv').config()

const path = require('path');
const electron = require('electron');
const isDev = require('electron-is-dev');

const DaemonProcess = require('./process');
const registerEvents = require('./events');

const daemon = new DaemonProcess();

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let appIcon;
let mainWindow;
let destroyStream = () => {};
const isMac = process.platform === "darwin";

const trayIcon = path.join(__dirname, 'trayTemplate.png');

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
    icon: path.join(__dirname, '/icon.png'),
    webPreferences: {
      webSecurity: false,
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

  mainWindow.on('closed', () => mainWindow = null);

  mainWindow.on('close', (event) => {
    if (app.quitting) {
      mainWindow = null;
    } else {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  appIcon = new electron.Tray(trayIcon);
  const contextMenu = electron.Menu.buildFromTemplate([
    {
      label: 'Initializing Daemon',
      type: 'normal',
      enabled: false,
      icon: path.join(__dirname, 'pending.png'),
    },
    {
      label: 'Stop Daemon',
      type: 'normal',
    },
    {
      type: 'separator',
    },
    {
      label: 'Quit Space',
      type: 'normal',
    },
  ]);

  appIcon.setToolTip('some test');
  appIcon.setContextMenu(contextMenu);

  destroyStream = registerEvents(mainWindow);
};




daemon.on('pending', () => {
  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    destroyStream();
    daemon.stop();

    if (process.platform !== 'darwin') {
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

  app.on('before-quit', () => app.quitting = true);
});

daemon.on('ready', () => {
  console.log('ready fired!');

  const contextMenu = electron.Menu.buildFromTemplate([
    {
      label: 'Space Daemon Runing',
      type: 'normal',
      enabled: false,
      icon: path.join(__dirname, 'ready.png'),
    },
    {
      label: 'Stop Daemon',
      type: 'normal',
    },
    {
      type: 'separator',
    },
    {
      label: 'Quit Space',
      type: 'normal',
    },
  ]);

  appIcon.setContextMenu(contextMenu);
});

daemon.start();
