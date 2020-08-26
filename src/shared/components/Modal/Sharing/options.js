export default (t, withRemoveOption = false) => {
  const baseOptions = [
    {
      id: 'edit',
      selected: true,
      title: t('common.access.edit.title'),
      description: t('common.access.edit.description'),
    },
    // {
    //   id: 'view',
    //   selected: true,
    //   title: t('common.access.view.title'),
    //   description: t('common.access.view.description'),
    // },
  ];

  if (!withRemoveOption) return baseOptions;

  return [
    ...baseOptions,
    {
      id: 'remove',
      title: 'Remove',
      danger: true,
    },
  ];
};
