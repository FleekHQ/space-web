const electron = require('electron');
const ContextMenuArea = require('react-electron-contextmenu');

window.remote = electron.remote;
window.ContextMenuArea = ContextMenuArea.default;
