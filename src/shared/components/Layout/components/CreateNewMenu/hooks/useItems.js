/* eslint-disable import/no-cycle */
import { useTranslation } from 'react-i18next';
import { faFilePlus } from '@fortawesome/pro-regular-svg-icons/faFilePlus';
import { faFolderPlus } from '@fortawesome/pro-regular-svg-icons/faFolderPlus';
import { faFileAlt } from '@fortawesome/pro-regular-svg-icons/faFileAlt';
import Divider from '@material-ui/core/Divider';

import getUploadComponent from '../components/getUploadComponent';
import Option from '../components/Option';


const { PUBLIC_URL } = process.env;

const useItems = () => {
  const { t } = useTranslation();

  return [
    {
      id: 'file-upload',
      label: t('createNewMenu.fileUpload'),
      component: getUploadComponent(false),
      icon: faFilePlus,
      onClick: (files) => console.log('upload files', files),
    },
    {
      id: 'folder-upload',
      label: t('createNewMenu.folderUpload'),
      component: getUploadComponent(true),
      icon: faFolderPlus,
      onClick: (files) => console.log('upload directory', files),
    },
    {
      component: Divider,
    },
    {
      id: 'option-with-submenu',
      label: 'Text Doc',
      component: Option,
      icon: faFileAlt,
      subItems: [
        {
          id: 'submenu-item',
          label: 'Submenu item',
          component: Option,
          img: `${PUBLIC_URL}/assets/icons/google-sheet.png`,
          width: 12,
          height: 12,
          onClick: () => console.log('submenu action'),
        },
      ],
    },
  ];
};

export default useItems;
