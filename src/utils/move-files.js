import { orderBy } from 'lodash';

const getFolderContents = (objects, folderKey) => (
  objects.reduce((filteredObjects, object) => {
    if (object.key !== folderKey && object.key.startsWith(folderKey)) {
      filteredObjects.push(object);
    }

    return filteredObjects;
  }, [])
);

export const populateWithSelected = ({ objects, objectKey, targetKey }) => {
  const selectedKeys = objects.reduce((filteredKeys, object) => {
    const getParents = (key) => {
      const parents = key.split('/');
      parents.pop();

      return parents;
    };

    const droppedParents = getParents(object.key);

    const moveToCurrentFolder = droppedParents.join('/') === targetKey;
    if (object.selected && !moveToCurrentFolder) {
      filteredKeys.push(object.key);
    }

    return filteredKeys;
  }, []);

  return selectedKeys.includes(objectKey) ? selectedKeys : [objectKey];
};

export const moveFiles = (payload) => {
  const {
    objects,
    sources,
    target,
    bucket,
    recursive,
  } = {
    recursive: true,
    ...payload,
  };

  const iterableKeys = Array.isArray(sources) ? sources : [sources];

  // Ensures file nesting is handled propperly
  const orderedObjects = orderBy(objects, (o) => o.key.length, ['asc']);
  return orderedObjects.reduce((filteredObjects, object) => {
    if (iterableKeys.includes(object.key)) {
      const targetPrefix = target === '' ? '' : `${target}/`;

      const newObject = {
        ...object,
        newKey: `${targetPrefix}${object.name}`,
        newFullKey: `${bucket}/${targetPrefix}${object.name}`,
        newId: `${bucket}/${targetPrefix}${object.name}`,
      };

      filteredObjects.push(newObject);

      if (recursive && object.ext === 'folder') {
        const folderContent = getFolderContents(objects, object.key);
        const folderContentKeys = folderContent.map((obj) => obj.key);
        const nestedPayload = {
          objects,
          sources: folderContentKeys,
          target: `${targetPrefix}${object.name}`,
          bucket,
          recursive,
        };

        const nestedFiles = moveFiles(nestedPayload);
        filteredObjects.push(...nestedFiles);
      }
    }

    return filteredObjects;
  }, []);
};

export const getSourceAndDestinationArrays = (objects) => (
  objects.reduce((returnArrays, object) => {
    returnArrays[0].push(object.key);
    returnArrays[1].push(object.newKey);

    return returnArrays;
  }, [[], []])
);

export const getFolderKeys = (objects, sources) => (
  objects.reduce((filteredObjects, object) => {
    if (object.type === 'folder' && sources.includes(object.key)) {
      filteredObjects.push(object.key);
    }

    return filteredObjects;
  }, [])
);

export const getFileCount = (objects) => (
  objects.reduce((countObject, object) => {
    const addCount = (type) => {
      const fileType = type === 'folder' ? type : 'file';
      /* eslint-disable-next-line */
      countObject[fileType] === undefined ? countObject[fileType] = 1 : countObject[fileType] += 1;
    };

    if (object.type !== 'keep') {
      addCount(object.type);
    }

    return countObject;
  }, {})
);
