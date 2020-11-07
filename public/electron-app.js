require('dotenv').config();
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const url = require('url');
const path = require('path');
const { app, Tray } = require('electron');
const isDev = require('electron-is-dev');

const DaemonProcess = require('./electron/daemon');
const registerEvents = require('./electron/events');
const createMainWindow = require('./electron/window/main');
const { getMenuOptions, trayIcon } = require('./electron/tray-menu');

let appIcon;
let mainWindow;
let goTo = null;
let destroyStream = () => {};

const daemon = new DaemonProcess();

const enableDevDaemon = process.env.DEV_DAEMON === 'true';

const isSingleInstance = app.requestSingleInstanceLock();

// Close second instance
if (!isSingleInstance) {
  app.quit();
  return;
}

const restoreWindow = (windowInstance) => {
  if (!windowInstance) {
    mainWindow = createMainWindow();

    destroyStream = registerEvents({
      app,
      isDev,
      mainWindow,
    });
  } else {
    windowInstance.show();
    windowInstance.focus();
  }
};

app.userAgentFallback = 'Chrome';
app.setAsDefaultProtocolClient('space');

/**
 * App events
 */
app.on('second-instance', () => {
  restoreWindow(mainWindow);
});

app.on('open-url', (event, data) => {
  event.preventDefault();

  goTo = decodeURIComponent(data.replace('space://', ''));

  if (mainWindow) {
    const fileUrl = url.format({
      hash: goTo,
      protocol: 'file',
      pathname: path.resolve(__dirname, '../build/index.html'),
    });

    mainWindow.loadURL(isDev
      ? `http://localhost:3000${goTo ? `/#/${goTo}` : ''}`
      : fileUrl);
  }
});

app.on('window-all-closed', () => {
  // eslint-disable-next-line no-console
  console.log('All windows are closed...');
  destroyStream();

  if (process.platform !== 'darwin' || app.newUpdate) {
    app.quit();
  }
});

app.on('activate', () => {
  restoreWindow(mainWindow);
});

app.on('before-quit', () => {
  // eslint-disable-next-line no-console
  console.log('App is quiting...');
  daemon.stop();
  app.quitting = true;
});

app.on('ready', () => {
  mainWindow = createMainWindow();

  const contextMenu = getMenuOptions(app, 'pending');

  appIcon = new Tray(trayIcon);
  appIcon.setContextMenu(contextMenu);

  appIcon.on('double-click', () => {
    restoreWindow(mainWindow);
  });
});

/**
 * Daemon Event handlers
 */
daemon.on('ready', () => {
  const fileUrl = url.format({
    hash: goTo,
    protocol: 'file',
    pathname: path.resolve(__dirname, '../build/index.html'),
  });

  mainWindow.loadURL(isDev
    ? `http://localhost:3000${goTo ? `/#/${goTo}` : ''}`
    : fileUrl);

  mainWindow.setSize(1200, 680);
  mainWindow.center();

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

  if (appIcon) {
    const contextMenu = getMenuOptions(app, 'ready');
    appIcon.setContextMenu(contextMenu);
  }
});

/**
 * Run Daemon
 */
if (isDev && !enableDevDaemon) {
  daemon.startDev();
  return;
}

daemon.start();
