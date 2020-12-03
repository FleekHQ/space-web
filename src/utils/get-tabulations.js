const getTabulations = (rowKey, location) => {
  const locationWithRoot = location.pathname.split('/').filter((folder) => folder !== '');
  const locationWithoutRoot = locationWithRoot.slice(2, locationWithRoot.length);
  const rootFolderAmount = locationWithoutRoot.length;
  const currentItemFolderAmount = rowKey.split('/').length;
  const tabulations = currentItemFolderAmount - rootFolderAmount - 1;

  return tabulations;
};

export default getTabulations;
