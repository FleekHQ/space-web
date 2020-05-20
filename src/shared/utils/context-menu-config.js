const menuItems = ({
  t,
  openOnClick,
  openWithOnClick,
  starOnClick,
  shareOnClick,
  copyLinkOnClick,
  duplicateOnClick,
  renameOnClick,
  copyOnClick,
  deleteOnClick,
  viewInFolderOnClick,
  showOpenWith,
}) => ([
  {
    label: t('contextMenu.open'), click: openOnClick,
  },
  ...(
    !showOpenWith 
    ? []
    : [
        {
          label: t('contextMenu.openWith'),
          click: openWithOnClick
        }
      ]
  ),
  {
    label: t('contextMenu.star'), click: starOnClick,
  },
  {
    type: 'separator',
  },
  {
    label: t('contextMenu.share'), click: shareOnClick,
  },
  {
    label: t('contextMenu.copyLink'), click: copyLinkOnClick,
  },
  {
    type: 'separator',
  },
  {
    label: t('contextMenu.duplicate'), click: duplicateOnClick,
  },
  {
    label: t('contextMenu.rename'), click: renameOnClick,
  },
  {
    label: t('contextMenu.copy'), click: copyOnClick,
  },
  {
    label: t('contextMenu.delete'), click: deleteOnClick,
  },
  {
    type: 'separator',
  },
  {
    label: t('contextMenu.viewInFolder'), click: viewInFolderOnClick,
  },
]);

export default menuItems;
