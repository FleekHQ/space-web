import get from 'lodash/get';
import getObjectRegex from './get-object-regex';

const objectsSelector = (state, bucket, prefix, delimiter) => {
  const {
    buckets,
    searchTerm = '',
  } = state.storage;

  const objects = get(buckets, `${bucket}.objects`, []);

  const keyRegex = getObjectRegex(bucket, prefix, delimiter);

  return objects.filter((obj) => {
    if (obj.name === '.keep') return false;

    const prefixPath = prefix ? `/${prefix}` : '/';

    if (obj.fullKey === `${bucket}${prefixPath}${delimiter}`) return false;

    const regexFilter = keyRegex.test(obj.fullKey);
    const searchTermFilter = searchTerm === ''
      ? true
      : obj.name.toLowerCase().includes(searchTerm.toLowerCase());

    return regexFilter && searchTermFilter;
  });
};

export default objectsSelector;
