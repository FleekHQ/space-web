const fs = require('fs');
const path = require('path');
const { ipcMain } = require('electron');


const EVENT_PREFIX = 'upload';
const START_EVENT = `${EVENT_PREFIX}:start`;
const SUCCESS_EVENT = `${EVENT_PREFIX}:success`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;

const registerUploadEvents = (mainWindow) => {
  ipcMain.on(START_EVENT, (event, payload) => {
    // TODO: replace with call to gRPC method
    mainWindow
    .webContents
    .executeJavaScript('localStorage.getItem("_wd");', true)
    .then((cwd) => {
      if (!cwd) return;
      const { files, prefix } = payload;

      files.forEach(({ fullPath, relativePath, relativePathWithFile }) => {
        const copy = () => {
          const destPath = path.join(cwd, prefix, relativePathWithFile);
          fs.copyFile(fullPath, destPath, (err) => {
            if (err) throw err;
          });
        };

        if (relativePath) {
          const destPath = path.join(cwd, prefix, relativePath);
          fs.mkdir(destPath, copy);
        } else {
          copy();
        }
      });
      mainWindow.webContents.send(SUCCESS_EVENT);
    })
    .catch((err) => {
      console.log(err);
      mainWindow.webContents.send(ERROR_EVENT, err);
    });
  });
};

module.exports = registerUploadEvents;
