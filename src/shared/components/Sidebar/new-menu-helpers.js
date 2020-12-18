import { remote } from 'electron';
import { addItems } from '@events';
import { openModal, CREATE_FOLDER } from '@shared/components/Modal/actions';
import { faFileUpload } from '@fortawesome/pro-regular-svg-icons/faFileUpload';
import { faFolderUpload } from '@fortawesome/pro-regular-svg-icons/faFolderUpload';

const MENU_DROPDOWN_ITEMS = {
  newFolder: 'newFolder',
  fileUpload: 'openFile',
  folderUpload: 'openDirectory',
};

export const getMenuDropdownItems = (t) => [
  {
    id: MENU_DROPDOWN_ITEMS.fileUpload,
    divider: false,
    icon: faFileUpload,
    name: t('createNewMenu.fileUpload'),
  },
  {
    id: MENU_DROPDOWN_ITEMS.folderUpload,
    divider: true,
    icon: faFolderUpload,
    name: t('createNewMenu.folderUpload'),
  },
  {
    id: MENU_DROPDOWN_ITEMS.newFolder,
    divider: false,
    icon: faFolderUpload,
    name: t('createNewMenu.folder'),
  },
];

const openDialog = async (prefix, properties) => {
  try {
    const { filePaths = [] } = await remote.dialog.showOpenDialog({
      properties: ['multiSelections', ...properties],
    });

    if (filePaths.length) {
      addItems({
        targetPath: prefix,
        sourcePaths: filePaths,
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error when selecting a folder or a file: ', error.message);
  }
};

export const getOnMenuItemClick = (dispatch, prefix) => (itemId, objPath) => {
  if (itemId === MENU_DROPDOWN_ITEMS.newFolder) {
    dispatch(openModal(CREATE_FOLDER, objPath));
    return;
  }

  openDialog(prefix, [itemId]);
};
