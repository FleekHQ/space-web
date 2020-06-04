import { useTranslation } from 'react-i18next';
import { faFileUpload } from '@fortawesome/pro-regular-svg-icons/faFileUpload';
import { faFolderUpload } from '@fortawesome/pro-regular-svg-icons/faFolderUpload';

import getUploadComponent from '../components/getUploadComponent';

const useItems = () => {
  const { t } = useTranslation();

  return [
    {
      id: 'file-upload',
      label: t('createNewMenu.fileUpload'),
      component: getUploadComponent(false),
      icon: faFileUpload,
      onClick: (files) => console.log('upload files', files),
    },
    {
      id: 'folder-upload',
      label: t('createNewMenu.folderUpload'),
      component: getUploadComponent(true),
      icon: faFolderUpload,
      onClick: (files) => console.log('upload directory', files),
    },
  ];
};

export default useItems;
