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

// eslint-disable-next-line no-unused-vars
const openDialog = async ({ prefix, type }) => {
  try {
    const fileInput = document.createElement('input');
    if (type === MENU_DROPDOWN_ITEMS.folderUpload) {
      fileInput.setAttribute('multiple', '');
      fileInput.setAttribute('directory', '');
      fileInput.setAttribute('odirectory', '');
      fileInput.setAttribute('msdirectory', '');
      fileInput.setAttribute('mozdirectory', '');
      fileInput.setAttribute('webkitdirectory', '');
    }
    // eslint-disable-next-line prefer-arrow-callback
    fileInput.addEventListener('change', (event) => {
      const sourcePaths = Array.from(event.target.files).map((file) => ({
        name: file.name,
        data: file.stream(),
        path: file.webkitRelativePath || file.name,
      }));

      addItems({
        sourcePaths,
        targetPath: prefix,
      });
    }, false);

    fileInput.type = 'file';
    fileInput.click();
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

  openDialog({ prefix, type: itemId });
};