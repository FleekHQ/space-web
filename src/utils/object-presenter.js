import get from 'lodash/get';

import formatBytes from './format-bytes';

const defaultEntryMapper = (entry) => entry;

// TODO: remove entryMapper func after SDK release with bucket info on file item
const objectPresenter = (entry = {}, isRootDir = false, entryMapper = defaultEntryMapper) => {
  const obj = entryMapper(entry);

  const bucket = get(obj, 'bucket', '') || '';
  const key = (get(obj, 'path', '') || '').replace(/^\//, '');

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
  const sourcePath = get(obj, 'sourcePath', '');
  const uuid = get(obj, 'uuid');
  const isUploading = get(obj, 'isUploading', false);

  return {
    key,
    ext,
    dbId,
    uuid,
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
    isUploading,
    sourcePath,
  };
};

export default objectPresenter;
