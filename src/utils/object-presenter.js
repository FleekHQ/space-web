import get from 'lodash/get';

import formatBytes from './format-bytes';

const objectPresenter = (obj = {}) => {
  const bucket = get(obj, 'bucket', '') || '';
  const key = get(obj, 'path', '');

  const isFolder = get(obj, 'isDir', false);
  const name = get(obj, 'name');
  const ext = isFolder ? 'folder' : get(obj, 'fileExtension');

  const type = isFolder ? 'folder' : 'file';

  const lastModified = new Date(get(obj, 'updated'));
  const created = new Date(get(obj, 'created'));

  const size = parseInt(get(obj, 'sizeInBytes', 0), 10);
  const bytesSize = formatBytes(size);

  const membersArray = get(obj, 'members', []);
  const backupCount = get(obj, 'backupCount', 0);
  const isLocallyAvailable = get(obj, 'isLocallyAvailable', false);

  return {
    key,
    ext,
    type,
    name,
    size,
    bucket,
    created,
    bytesSize,
    lastModified,
    selected: false,
    id: `${bucket}${key}`,
    fullKey: `${bucket}${key}`,
    ipfsHash: get(obj, 'ipfsHash'),
    isAvailableInSpace: backupCount > 0,
    isLocallyAvailable,
    shareAmount: membersArray.length,
  };
};

export default objectPresenter;
