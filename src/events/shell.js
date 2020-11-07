import { ipcRenderer } from 'electron';

const EVENT_PREFIX = 'shell';
const OPEN_EXTERNAL_LINK_EVENT = `${EVENT_PREFIX}:openExternalLink`;

/* eslint-disable import/prefer-default-export */
export const openExternalLink = (url) => {
  ipcRenderer.send(OPEN_EXTERNAL_LINK_EVENT, url);
};
