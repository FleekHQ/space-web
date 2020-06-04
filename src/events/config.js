import get from 'lodash/get';
import { ipcRenderer } from 'electron';

const EVENT_PREFIX = 'configInfo';
const FETCH_EVENT = `${EVENT_PREFIX}:fetch`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUCCESS_EVENT = `${EVENT_PREFIX}:success`;

const storeKey = (key, value) => {
  if (value && value !== localStorage.getItem(key)) {
    localStorage.setItem(key, value);
  }
};

const registerConfigEvents = () => {
  ipcRenderer.on(SUCCESS_EVENT, (event, payload) => {
    storeKey('_wd', get(payload, 'folderPath'));
    storeKey('_port', get(payload, 'port'));
    storeKey('_appPath', get(payload, 'appPath'));
  });

  ipcRenderer.on(ERROR_EVENT, (event, payload) => {
    /* eslint-disable-next-line no-console */
    console.log(ERROR_EVENT, payload);
  });
};

export const fetchConfigInfo = (payload) => ipcRenderer.send(FETCH_EVENT, payload);

export default registerConfigEvents;
