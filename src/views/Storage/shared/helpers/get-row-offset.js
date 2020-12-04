const getTabulationAmount = (location, row) => {
  const locationWithRoot = location.pathname.split('/').filter((folder) => folder !== '');
  const locationWithoutRoot = locationWithRoot.slice(2, locationWithRoot.length);
  const rootFolderAmount = locationWithoutRoot.length;
  const { key = '' } = row;
  const currentItemFolderAmount = key.split('/').length;
  const tabulations = currentItemFolderAmount - rootFolderAmount - 1;

  return tabulations;
};

export default getTabulationAmount;
