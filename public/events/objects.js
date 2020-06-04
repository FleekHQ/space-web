const { ipcMain, shell } = require('electron');

const client = require('../client');

const EVENT_PREFIX = 'objects';
const FETCH_EVENT = `${EVENT_PREFIX}:fetch`;
const ERROR_EVENT = `${EVENT_PREFIX}:error`;
const SUCCESS_EVENT = `${EVENT_PREFIX}:success`;
const OPEN_EVENT = `${EVENT_PREFIX}:open`;

// TODO: remove mockResponse
const mockResponse = {
  entries: [
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha',
      isDir: true,
      name: 'space-app',
      sizeInBytes: '512',
      created: '2020-06-02 11:06:41.217077373 -0400 -04',
      updated: '2020-06-02 11:06:41.217077373 -0400 -04',
      fileExtension: ''
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/.DS_Store',
      isDir: false,
      name: '.DS_Store',
      sizeInBytes: '6148',
      created: '2020-05-28 16:07:51.023830329 -0400 -04',
      updated: '2020-05-28 16:07:51.023830329 -0400 -04',
      fileExtension: 'DS_Store'
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/Book1.xlsx',
      isDir: false,
      name: 'Book1.xlsx',
      sizeInBytes: '8634',
      created: '2020-05-28 11:51:41.896623367 -0400 -04',
      updated: '2020-05-28 11:51:41.896623367 -0400 -04',
      fileExtension: 'xlsx'
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/Presentation.pptx',
      isDir: false,
      name: 'Presentation.pptx',
      sizeInBytes: '265456',
      created: '2020-05-28 11:52:52.695353363 -0400 -04',
      updated: '2020-05-28 11:52:52.695353363 -0400 -04',
      fileExtension: 'pptx'
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/Space-app.docx',
      isDir: false,
      name: 'Space-app.docx',
      sizeInBytes: '11728',
      created: '2020-05-28 11:51:03.84242857 -0400 -04',
      updated: '2020-05-28 11:51:03.84242857 -0400 -04',
      fileExtension: 'docx'
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/cat.jpg',
      isDir: false,
      name: 'cat.jpg',
      sizeInBytes: '351421',
      created: '2020-04-11 18:55:50.184396835 -0400 -04',
      updated: '2020-04-11 18:55:50.184396835 -0400 -04',
      fileExtension: 'jpg'
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/design.pdf',
      isDir: false,
      name: 'design.pdf',
      sizeInBytes: '2385913',
      created: '2020-05-27 15:10:31.807598379 -0400 -04',
      updated: '2020-05-27 15:10:31.807598379 -0400 -04',
      fileExtension: 'pdf'
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/empty',
      isDir: true,
      name: 'empty',
      sizeInBytes: '64',
      created: '2020-05-28 11:54:32.982336979 -0400 -04',
      updated: '2020-05-28 11:54:32.982336979 -0400 -04',
      fileExtension: ''
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/folder',
      isDir: true,
      name: 'folder',
      sizeInBytes: '256',
      created: '2020-05-29 17:16:00.45771272 -0400 -04',
      updated: '2020-05-29 17:16:00.45771272 -0400 -04',
      fileExtension: ''
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/folder/.DS_Store',
      isDir: false,
      name: '.DS_Store',
      sizeInBytes: '6148',
      created: '2020-05-28 16:07:57.104153775 -0400 -04',
      updated: '2020-05-28 16:07:57.104153775 -0400 -04',
      fileExtension: 'DS_Store'
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/folder/documents',
      isDir: true,
      name: 'documents',
      sizeInBytes: '160',
      created: '2020-06-02 09:14:14.082547179 -0400 -04',
      updated: '2020-06-02 09:14:14.082547179 -0400 -04',
      fileExtension: ''
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/folder/documents/book.docx',
      isDir: false,
      name: 'book.docx',
      sizeInBytes: '11728',
      created: '2020-05-28 11:51:03.84242857 -0400 -04',
      updated: '2020-05-28 11:51:03.84242857 -0400 -04',
      fileExtension: 'docx'
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/folder/documents/draft.docx',
      isDir: false,
      name: 'draft.docx',
      sizeInBytes: '11728',
      created: '2020-05-28 11:51:03.84242857 -0400 -04',
      updated: '2020-05-28 11:51:03.84242857 -0400 -04',
      fileExtension: 'docx'
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/folder/documents/notes.docx',
      isDir: false,
      name: 'notes.docx',
      sizeInBytes: '11728',
      created: '2020-05-28 11:51:03.84242857 -0400 -04',
      updated: '2020-05-28 11:51:03.84242857 -0400 -04',
      fileExtension: 'docx'
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/folder/invoice.pdf',
      isDir: false,
      name: 'invoice.pdf',
      sizeInBytes: '2385913',
      created: '2020-05-27 15:10:31.807598379 -0400 -04',
      updated: '2020-05-27 15:10:31.807598379 -0400 -04',
      fileExtension: 'pdf'
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/folder/key.sh',
      isDir: false,
      name: 'key.sh',
      sizeInBytes: '0',
      created: '2020-05-27 16:00:35.156385817 -0400 -04',
      updated: '2020-05-27 16:00:35.156385817 -0400 -04',
      fileExtension: 'sh'
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/folder/wallpaper.jpg',
      isDir: false,
      name: 'wallpaper.jpg',
      sizeInBytes: '2268899',
      created: '2020-04-11 19:01:52.48099514 -0400 -04',
      updated: '2020-04-11 19:01:52.48099514 -0400 -04',
      fileExtension: 'jpg'
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/folder/welcome.pptx',
      isDir: false,
      name: 'welcome.pptx',
      sizeInBytes: '265456',
      created: '2020-05-28 11:52:52.695353363 -0400 -04',
      updated: '2020-05-28 11:52:52.695353363 -0400 -04',
      fileExtension: 'pptx'
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/my-file.txt',
      isDir: false,
      name: 'my-file.txt',
      sizeInBytes: '0',
      created: '2020-05-28 16:10:26.228447745 -0400 -04',
      updated: '2020-05-28 16:10:26.228447745 -0400 -04',
      fileExtension: 'txt'
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/new-folder',
      isDir: true,
      name: 'new-folder',
      sizeInBytes: '64',
      created: '2020-05-28 16:10:39.608117654 -0400 -04',
      updated: '2020-05-28 16:10:39.608117654 -0400 -04',
      fileExtension: ''
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/new-test-file.txt',
      isDir: false,
      name: 'new-test-file.txt',
      sizeInBytes: '0',
      created: '2020-06-02 11:04:29.171234159 -0400 -04',
      updated: '2020-06-02 11:04:29.171234159 -0400 -04',
      fileExtension: 'txt'
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/original.zip',
      isDir: false,
      name: 'original.zip',
      sizeInBytes: '427071',
      created: '2020-04-09 12:19:09.947202634 -0400 -04',
      updated: '2020-04-09 12:19:09.947202634 -0400 -04',
      fileExtension: 'zip'
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/test.txt',
      isDir: false,
      name: 'test.txt',
      sizeInBytes: '5',
      created: '2020-05-15 17:09:33.090264768 -0400 -04',
      updated: '2020-05-15 17:09:33.090264768 -0400 -04',
      fileExtension: 'txt'
    },
    {
      path: '/ipfs/bafybeian44ntmjjfjbqt4dlkq4fiuhfzcxfunzuuzhbb7xkrnsdjb2sjha/test2.txt',
      isDir: false,
      name: 'test2.txt',
      sizeInBytes: '4',
      created: '2020-06-02 11:06:41.20293858 -0400 -04',
      updated: '2020-06-02 11:06:41.20293858 -0400 -04',
      fileExtension: 'txt'
    }
  ],
};

const registerObjectsEvents = (mainWindow) => {
  ipcMain.on(OPEN_EVENT, (event, payload) => {
    shell.openItem(payload);
  });

  ipcMain.on(FETCH_EVENT, (event, payload) => {
    client.ListDirectories(payload, (err, res) => {
      if (err) {
        return mainWindow.webContents.send(ERROR_EVENT, err);
      }

      // TODO replace mock response by res
      mainWindow.webContents.send(SUCCESS_EVENT, mockResponse);
    });
  });
};

module.exports = registerObjectsEvents;
