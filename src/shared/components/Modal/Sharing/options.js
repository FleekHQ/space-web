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

/**
 * @typedef {Object} Member
 * @property {number} role
 * @property {string} address
 * @property {string} publicKey
 *
 * @typedef {Object} SelectedObject
 * @property {string} id
 * @property {string} path
 * @property {string} name
 * @property {Array.<Member>} members
 *
 * Get share link options and set file public or noot
 * @param {Object} opts
 * @param {Function} opts.t
 * @param {SelectedObject} opts.selectedObject
 */
export const getShareLinkOptions = ({ t, selectedObject }) => {
  const isPublic = !!selectedObject.members.find((m) => (
    m.publicKey === '*' && m.role === 2
  ));

  return [
    {
      id: 'private',
      title: t('modals.sharingModal.shareLink.private'),
      description: t('modals.sharingModal.shareLink.privateDescription'),
      selected: !isPublic,
    },
    {
      id: 'public',
      title: t('modals.sharingModal.shareLink.public'),
      description: t('modals.sharingModal.shareLink.publicDescription'),
      selected: isPublic,
    },
  ];
};
