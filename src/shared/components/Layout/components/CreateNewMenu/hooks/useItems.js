import { matchPath, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';
import { startUpload } from '@events';
import { faFilePlus } from '@fortawesome/pro-regular-svg-icons/faFilePlus';
import { faFolderPlus } from '@fortawesome/pro-regular-svg-icons/faFolderPlus';
import getUploadComponent from '../components/getUploadComponent';

const upload = (files, prefix) => {
  const filesSrcPaths = files.map((file) => ({
    fullPath: file.path,
    relativePathWithFile: file.webkitRelativePath || file.name,
    relativePath: file.webkitRelativePath.replace(new RegExp(`${file.name}$`), ''),
  }));
  startUpload({ files: filesSrcPaths, prefix });
};

const useItems = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const match = matchPath(location.pathname, { path: '/storage/files/*' });
  const prefix = get(match, 'params.0', '');

  return [
    {
      id: 'file-upload',
      label: t('createNewMenu.fileUpload'),
      component: getUploadComponent(false),
      icon: faFilePlus,
      onClick: (files) => upload(files, prefix),
    },
    {
      id: 'folder-upload',
      label: t('createNewMenu.folderUpload'),
      component: getUploadComponent(true),
      icon: faFolderPlus,
      onClick: (files) => upload(files, prefix),
    },
  ];
};

export default useItems;
