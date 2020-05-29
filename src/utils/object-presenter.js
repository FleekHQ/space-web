import get from 'lodash/get';

import formatBytes from './format-bytes';

const objectPresenter = (obj = {}, bucket = '') => {
  const key = get(obj, 'path', '');

  const isFolder = get(obj, 'isDir', false);
  const name = get(obj, 'name');
  const ext = isFolder ? 'folder' : get(obj, 'fileExtension');

  const type = isFolder ? 'folder' : 'file';

  const lastModified = new Date(get(obj, 'updated'));
  const created = new Date(get(obj, 'created'));

  const size = get(obj, 'Size', 0);
  const bytesSize = isFolder
    ? '--'
    : formatBytes(size);

  return {
    key,
    type,
    name,
    size,
    bucket,
    created,
    bytesSize,
    lastModified,
    selected: false,
    id: `${bucket}/${key}`,
    fullKey: `${bucket}/${key}`,
    ext: ext.replace(/^\./, ''),
  };
};

export default objectPresenter;
