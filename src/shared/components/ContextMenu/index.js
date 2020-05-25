import React from 'react';
import { useTranslation } from "react-i18next";

const contextMenuConfig = ({
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



const ContextMenu = () => {
  const { t } = useTranslation(); 
  const menuItems = contextMenuConfig({ t });

  const { ContextMenuArea } = window;

  return (
    <ContextMenuArea menuItems={menuItems}>
      <div>Right click me to show a context menu!</div>
    </ContextMenuArea>
  );
};

export default ContextMenu;
