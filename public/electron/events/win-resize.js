const { ipcMain } = require('electron');

const registerWinResizeEvents = (mainWindow) => {
  ipcMain.on('winResize', async (_, payload = {}) => {
    const { width = 1200, height = 680 } = payload;

    mainWindow.setSize(width, height);
    mainWindow.center();
  });
};

module.exports = registerWinResizeEvents;
