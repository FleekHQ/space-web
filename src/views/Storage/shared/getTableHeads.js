export default (t) => [
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
