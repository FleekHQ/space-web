import get from 'lodash/get';

import formatBytes from './format-bytes';

const objectPresenter = (obj = {}, isRootDir = false) => {
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

  const members = get(obj, 'members', []);
  const backupCount = get(obj, 'backupCount', 0);
  const isLocallyAvailable = get(obj, 'isLocallyAvailable', false);
  const sourceBucket = get(obj, 'sourceBucket');
  const dbId = get(obj, 'dbId');
  const isPublicLink = get(obj, 'isPublicLink', false);
  const sharedBy = get(obj, 'sharedBy');

  return {
    key,
    ext,
    dbId,
    type,
    name,
    size,
    bucket,
    members,
    created,
    bytesSize,
    error: false,
    lastModified,
    isPublicLink,
    isLocallyAvailable,
    selected: undefined,
    id: `${bucket}/${key}`,
    sharedBy: sharedBy === '' ? null : sharedBy,
    fullKey: `${bucket}/${isRootDir ? name : key}`,
    ipfsHash: get(obj, 'ipfsHash'),
    isAvailableInSpace: backupCount > 0,
    sourceBucket: sourceBucket || bucket,
    shareAmount: Math.max(1, members.length),
    isUploading: false,
  };
};

export default objectPresenter;
