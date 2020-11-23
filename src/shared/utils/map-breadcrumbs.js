const mapBreadcrumbs = (rootName, path) => {
  const splitPath = path.split('/').filter((item) => item !== '');
  const rootPath = `/${splitPath.slice(0, 2).join('/')}`;
  const folderPathSplit = splitPath.slice(2, splitPath.length);
  const folderItems = folderPathSplit.map((folder, index) => {
    const trimmedFolderPath = `/${folderPathSplit.slice(0, index + 1).join('/')}`;
    const redirectPath = `${rootPath}${trimmedFolderPath}`;
    return ({
      id: redirectPath,
      name: folder,
      type: 'folder',
      path: redirectPath,
    });
  });
  const rootItem = {
    id: rootPath,
    name: rootName,
    type: 'root',
    path: rootPath,
  };

  return ([rootItem, ...folderItems]);
};

export default mapBreadcrumbs;
