import { CONTEXT_OPTION_IDS } from '@ui/ContextMenu';
import { faExpandArrowsAlt } from '@fortawesome/pro-regular-svg-icons/faExpandArrowsAlt';
import { faShare } from '@fortawesome/pro-regular-svg-icons/faShare';
import { faTrash } from '@fortawesome/pro-regular-svg-icons/faTrash';
import { faLink } from '@fortawesome/pro-regular-svg-icons/faLink';
import { faEye } from '@fortawesome/pro-regular-svg-icons/faEye';

const mapContextMenuItems = (clickedItem = {}, t) => {
  if (clickedItem.isUploading && clickedItem.error) {
    return [];
  }

  const isFile = clickedItem.type === 'file' && clickedItem.isAvailableInSpace;

  const shareOption = {
    id: CONTEXT_OPTION_IDS.share,
    displayText: t('tableMenu.share'),
    icon: faShare,
  };

  const getLinkOption = {
    id: CONTEXT_OPTION_IDS.copyLink,
    displayText: t('tableMenu.getLink'),
    icon: faLink,
  };

  const previewOption = {
    id: CONTEXT_OPTION_IDS.preview,
    displayText: t('tableMenu.preview'),
    icon: faEye,
  };

  return ([
    ...(isFile ? [previewOption] : []),
    {
      id: CONTEXT_OPTION_IDS.open,
      displayText: t('tableMenu.open'),
      icon: faExpandArrowsAlt,
    },
    ...(isFile ? [{ type: 'divider' }] : []),
    ...(isFile ? [shareOption] : []),
    ...(isFile ? [getLinkOption] : []),
    {
      type: 'divider',
    },
    {
      id: CONTEXT_OPTION_IDS.trash,
      displayText: t('tableMenu.delete'),
      icon: faTrash,
    },
  ]);
};

export default mapContextMenuItems;
