const path = require('path');
const { Menu } = require('electron');

const iconsPath = path.join(__dirname, '..', '..', 'assets', 'icons');
const trayIcon = path.join(iconsPath, 'trayTemplate.png');

const statusOptions = {
  pending: {
    label: 'Initializing Space Daemon',
    type: 'normal',
    enabled: false,
    icon: path.join(iconsPath, 'pending.png'),
  },
  ready: {
    label: 'Space Daemon Running',
    type: 'normal',
    enabled: false,
    icon: path.join(iconsPath, 'ready.png'),
  },
  failed: {
    label: 'Space Daemon Error',
    type: 'normal',
    enabled: false,
    icon: path.join(iconsPath, 'failed.png'),
  },
};

const getMenuOptions = (app, status = 'pending') => {
  const statusOption = statusOptions[status] || statusOptions.pending;

  return Menu.buildFromTemplate([
    statusOption,
    {
      type: 'separator',
    },
    {
      label: 'Quit Space',
      type: 'normal',
      click: () => app.quit(),
    },
  ]);
};

module.exports = {
  trayIcon,
  getMenuOptions,
};
