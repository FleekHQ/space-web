import React from 'react';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { matchPath, useLocation } from 'react-router-dom';

import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import { faFileUpload } from '@fortawesome/pro-regular-svg-icons/faFileUpload';
import { faFolderUpload } from '@fortawesome/pro-regular-svg-icons/faFolderUpload';

import MenuDropdown from '@ui/MenuDropdown';
import { addItems } from '@events';
import { openModal, CREATE_FOLDER } from '@shared/components/Modal/actions';

import { MENU_DROPDOWN_ITEMS } from './constants';
import useStyles, { useIconButtonStyles } from './styles';

const CreateNewButton = () => {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const iconBtnClasses = useIconButtonStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'account-menu' : undefined;
  const match = matchPath(location.pathname, { path: '/storage/files/*' });
  const prefix = get(match, 'params.0', '');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // eslint-disable-next-line no-unused-vars
  const openDialog = async ({ type }) => {
    try {
      const fileInput = document.createElement('input');
      if (type === 'folder') {
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

  const handleMenuItemClick = (item) => {
    setAnchorEl(null);
    if (item.id === MENU_DROPDOWN_ITEMS.fileUpload) {
      openDialog({ type: 'file' });
      return;
    }

    if (item.id === MENU_DROPDOWN_ITEMS.folderUpload) {
      openDialog({ type: 'folder' });
      return;
    }

    dispatch(openModal(CREATE_FOLDER, { path: prefix }));
  };

  return (
    <>
      <IconButton
        disableRipple
        disableFocusRipple
        color="primary"
        aria-describedby={id}
        classes={iconBtnClasses}
        onClick={handleClick}
      >
        <img src={`${process.env.PUBLIC_URL}/assets/icons/plus_colors.png`} alt="add new" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{
          paper: classes.rootPopover,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuDropdown
          items={[
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
          ]}
          onItemClick={handleMenuItemClick}
        />
      </Popover>
    </>
  );
};

export default CreateNewButton;
