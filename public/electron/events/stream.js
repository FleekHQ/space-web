const { spaceClient } = require('../clients');
const { entryToObject } = require('./objects');

const EVENT_PREFIX = 'eventStream';
const EVENT_STREAM_DELETE_ITEM = `${EVENT_PREFIX}:delete`;
const EVENT_STREAM_UPDATE_ITEM = `${EVENT_PREFIX}:update`;

const EventType = {
  ENTRY_ADDED: 0,
  ENTRY_DELETED: 1,
  ENTRY_UPDATED: 2,
  ENTRY_BACKUP_IN_PROGRESS: 3,
  ENTRY_BACKUP_READY: 4,
  ENTRY_RESTORE_IN_PROGRESS: 5,
  ENTRY_RESTORE_READY: 6,
  FOLDER_ADDED: 7,
  FOLDER_DELETED: 8,
  FOLDER_UPDATED: 9,
};

const registerEventStream = (mainWindow) => {
  const eventStream = spaceClient.subscribe();

  eventStream.on('data', (event) => {
    // TODO: Check with BE event to update files on FE
    // mainWindow.webContents.send(`${EVENT_PREFIX}:data`, event);

    const dbId = event.getDbid();
    const entry = event.getEntry();
    const eventType = event.getType();
    const sourceBucket = event.getBucket();
    const bucket = sourceBucket === 'personal' ? 'personal' : 'shared-with-me';

    const item = {
      sourceBucket,
      ...entryToObject(entry, bucket),
      ...(bucket !== 'personal' && { dbId }),
    };

    if (eventType === EventType.ENTRY_DELETED || eventType === EventType.FOLDER_DELETED) {
      return mainWindow.webContents.send(EVENT_STREAM_DELETE_ITEM, item);
    }

    return mainWindow.webContents.send(EVENT_STREAM_UPDATE_ITEM, item);
  });

  /* eslint-disable no-console */
  eventStream.on('error', (error) => {
    try {
      console.error(`${EVENT_PREFIX}:error`, error);
      mainWindow.webContents.send(`${EVENT_PREFIX}:error`, error);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  });

  return eventStream;
};

module.exports = registerEventStream;
