const path = require('path');
const chalk = require('chalk');
const get = require('lodash/get');
const isDev = require('electron-is-dev');
const { spawn } = require('child_process');

const { DAEMON_PATH } = process.env;

class DaemonProcess {
  constructor() {
    this.childProcess = null;
    this.handlers = {
      ready: [],
      failed: [],
      pending: [],
    };
  }

  on(key, handler) {
    const accHandlers = get(this.handlers, key, []) || [];

    this.handlers = {
      ...this.handlers,
      [key]: [
        ...accHandlers,
        handler,
      ],
    };
  }

  callHandlers(key, args) {
    this.handlers[key].forEach((handler) => handler(args));
  }

  start() {
    if (this.childProcess) return;

    const daemonPath = isDev
      ? DAEMON_PATH
      : path.join(process.resourcesPath, 'space');

    this.childProcess = spawn(daemonPath);

    this.childProcess.stdout.on('data', (data) => {
      // eslint-disable-next-line no-console
      console.log(chalk.green(data));

      // TODO replace log message
      if (data.includes('daemon ready')) {
        this.callHandlers('ready');
      }
    });

    this.childProcess.stderr.on('data', (data) => {
      // eslint-disable-next-line no-console
      console.error(chalk.red(data));
    });

    this.callHandlers('pending');
  }

  startDev() {
    setTimeout(() => {
      this.callHandlers('ready');
    }, 5000);

    this.callHandlers('pending');
  }

  stop() {
    if (this.childProcess) {
      this.childProcess.kill();
      this.childProcess = null;
    }
  }
}

module.exports = DaemonProcess;
