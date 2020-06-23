const path = require('path');
const chalk = require('chalk');
const isDev = require('electron-is-dev');
const { spawn } = require('child_process');

const { DAEMON_PATH } = process.env;

const daemonPath = isDev
  ? DAEMON_PATH
  : path.join(process.resourcesPath, 'space');

const child = spawn(daemonPath);

if (isDev) {
  child.stdout.on('data', (data) => {
    console.log(chalk.green(data));
  });

  child.stderr.on('data', (data) => {
    console.error(chalk.red(data));
  });
}

module.exports = child;
