const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chokidar = require('chokidar');
const { ipcMain, shell } = require('electron');

const EVENT_PREFIX = 'objects';
const FETCH_EVENT = `${EVENT_PREFIX}:fetch`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUCCESS_EVENT = `${EVENT_PREFIX}:success`;
const OPEN_EVENT = `${EVENT_PREFIX}:open`;

let watcher;

const registerObjectsEvents = (mainWindow) => {
  ipcMain.on(OPEN_EVENT, (event, payload) => {
    shell.openItem(payload);
  });

  ipcMain.on(FETCH_EVENT, (event, payload) => {
    // TODO: replace with call to gRPC method
    mainWindow
      .webContents
      .executeJavaScript('localStorage.getItem("_wd");', true)
      .then((cwd) => {
        const listObjects = () => {
          const options = { cwd };

          if (!cwd) return;

          glob('**/*', options, (err, files) => {
            if (err) {
              mainWindow.webContents.send(ERROR_EVENT, err);
              return;
            }

            const objects = files.map((file) => {
              const filePath = path.join(cwd, file);
              const stats = fs.statSync(filePath);

              return {
                path: filePath,
                fullKey: filePath,
                size: stats['size'],
                updated: stats['mtime'],
                isDir: stats.isDirectory(),
                created: stats['birthtime'],
                name: path.basename(filePath),
                fileExtension: path.extname(filePath),
              };
            });

            mainWindow.webContents.send(SUCCESS_EVENT, objects);
          });
        };

        listObjects();

        if (watcher) {
          watcher.close();
        }

        watcher = chokidar.watch(cwd, { ignoreInitial: true });

        watcher.on('all', () => {
          listObjects();
        });
      })
      .catch((err) => {
        mainWindow.webContents.send(ERROR_EVENT, err);
      });
  });
};

module.exports = registerObjectsEvents;
