import { useTranslation } from 'react-i18next';
import { faFilePlus } from '@fortawesome/pro-regular-svg-icons/faFilePlus';
import { faFolderPlus } from '@fortawesome/pro-regular-svg-icons/faFolderPlus';
import getUploadComponent from '../components/getUploadComponent';

const useItems = () => {
  const { t } = useTranslation();

  return [
    {
      id: 'file-upload',
      label: t('createNewMenu.fileUpload'),
      component: getUploadComponent(false),
      icon: faFilePlus,
      onClick: (files) => {
        // eslint-disable-next-line no-console
        console.log('upload files', files);
      },
    },
    {
      id: 'folder-upload',
      label: t('createNewMenu.folderUpload'),
      component: getUploadComponent(true),
      icon: faFolderPlus,
      onClick: (files) => {
        // eslint-disable-next-line no-console
        console.log('upload directory', files);
      },
    },
  ];
};

export default useItems;
