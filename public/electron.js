const os = require('os');
const path = require('path');
const electron = require('electron');
const isDev = require('electron-is-dev');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

const createWindow = () => {
  const url = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    minWidth: 680,
    minHeight: 500,
  });

  mainWindow.loadURL(url);

  if (isDev) {
    // Add ReactDevTools
    BrowserWindow.addDevToolsExtension(path.join(
      os.homedir(),
      '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.4.0_0'
    ));

    // Add ReduxDevTools
    BrowserWindow.addDevToolsExtension(path.join(
      os.homedir(),
      '/Library/Application Support/Google/Chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0'
    ));

    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => (mainWindow = null));
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!mainWindow) {
    createWindow();
  }
});