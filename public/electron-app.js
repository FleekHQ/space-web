require('dotenv').config();

const { app } = require('electron');
const isDev = require('electron-is-dev');

const DaemonProcess = require('./electron/daemon');
const registerEvents = require('./electron/events');
const createMainWindow = require('./electron/window/main');
const createSplashWindow = require('./electron/window/splash');

let mainWindow;
let destroyStream = () => {};

const daemon = new DaemonProcess();

const enableDevDaemon = process.env.DEV_DAEMON === 'true';

/**
 * App events
 */
app.on('window-all-closed', () => {
  destroyStream();
  daemon.stop();

  if (process.platform !== 'darwin' || app.newUpdate) {
    app.quit();
  }
});

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  } else {
    mainWindow.show();
  }
});

app.on('before-quit', () => {
  app.quitting = true;
});

app.on('ready', () => {
  mainWindow = createSplashWindow();
});

/**
 * Daemon Event handlers
 */
daemon.on('ready', () => {
  const prevWindow = mainWindow;

  mainWindow = createMainWindow();

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

  prevWindow.destroy();

  destroyStream = registerEvents({
    app,
    isDev,
    mainWindow,
  });
});

/**
 * Run Daemon
 */
if (isDev && !enableDevDaemon) {
  daemon.startDev();
  return;
}

daemon.start();
