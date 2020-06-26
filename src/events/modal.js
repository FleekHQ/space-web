import { ipcRenderer } from 'electron';

import { modalKeys } from '../views/Modal/modals';

const EVENT_PREFIX = 'modal';
const OPEN_EVENT = `${EVENT_PREFIX}:open`;

/* eslint-disable import/prefer-default-export */
export const openShareModal = (payload) => {
  ipcRenderer.send(OPEN_EVENT, {
    ...payload,
    route: `/modal/${modalKeys.sharing}`,
    width: 460,
    height: 420,
    minWidth: 460,
    minHeight: 420,
    minimizable: false,
    maximizable: false,
  });
};
