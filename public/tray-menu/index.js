const path = require('path');
const { Tray, Menu } = require('electron');

let appIcon;
const trayIcon = path.join(__dirname, '..', 'assets', 'icons', 'trayTemplate.png');

const menuOptions = [
  {
    label: 'Initializing Daemon',
    type: 'normal',
    enabled: false,
    icon: path.join(__dirname, 'assets', 'icons', 'pending.png'),
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
];

appIcon = new electron.Tray(trayIcon);
  const contextMenu = electron.Menu.buildFromTemplate([
    {
      label: 'Initializing Daemon',
      type: 'normal',
      enabled: false,
      icon: path.join(__dirname, 'assets', 'icons', 'pending.png'),
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
