import get from 'lodash/get';
import getObjectRegex from './get-object-regex';

const getObjects = ({
  objects,
  searchTerm,
  prefix,
  bucket,
  delimiter,
  getExpandedContent,
}) => {
  const foundObjects = [];
  // eslint-disable-next-line consistent-return
  objects.forEach((obj) => {
    if (obj.name === '.keep') return false;

    const prefixPath = prefix ? `/${prefix}` : '/';

    if (obj.fullKey === `${bucket}${prefixPath}${delimiter}`) return false;

    const keyRegex = getObjectRegex(bucket, prefix, delimiter);
    const regexFilter = keyRegex.test(obj.fullKey);
    const searchTermFilter = searchTerm === ''
      ? true
      : obj.name.toLowerCase().includes(searchTerm.toLowerCase());

    const newObject = obj;
    if (regexFilter && searchTermFilter) {
      if (getExpandedContent && obj.expanded === true) {
        const folderContent = getObjects({
          objects,
          searchTerm,
          prefix: obj.key,
          bucket,
          delimiter,
          getExpandedContent,
        });
        newObject.folderContent = folderContent;
      }
      foundObjects.push(newObject);
    }
  });
  return foundObjects;
};

const objectsSelector = (state, bucket, prefix, delimiter, getExpandedContent = false) => {
  const {
    buckets,
    searchTerm = '',
  } = state.storage;

  const objects = get(buckets, `${bucket}.objects`, []);

  const foundObjects = getObjects({
    objects,
    searchTerm,
    prefix,
    bucket,
    delimiter,
    getExpandedContent,
  });

  return foundObjects;
};

export default objectsSelector;
