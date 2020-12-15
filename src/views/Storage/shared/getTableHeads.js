const getPersonalHeaders = (t) => [
  {
    id: 'name',
    width: '50%',
    title: t('modules.storage.fileTable.head.name'),
    isSortable: true,
  },
  {
    id: 'size',
    width: '25%',
    title: t('modules.storage.fileTable.head.size'),
    isSortable: true,
    paddingLeft: 23,
  },
  {
    id: 'lastModified',
    width: '25%',
    title: t('modules.storage.fileTable.head.lastModified'),
    isSortable: true,
  },
];

const getSharedHeaders = (t) => [
  {
    id: 'name',
    width: '50%',
    title: t('modules.storage.fileTable.head.name'),
    isSortable: true,
  },
  {
    id: 'size',
    width: '25%',
    title: t('modules.storage.fileTable.head.sharedBy'),
    isSortable: true,
  },
  {
    id: 'lastModified',
    width: '25%',
    title: t('modules.storage.fileTable.head.lastModified'),
    isSortable: true,
  },
];

const headerTypes = {
  shared: getSharedHeaders,
  personal: getPersonalHeaders,
};

export default (t, type) => headerTypes[type](t);
