import { CONTEXT_OPTION_IDS } from '@ui/ContextMenu';
import { faExpandArrowsAlt } from '@fortawesome/pro-regular-svg-icons/faExpandArrowsAlt';
import { faShare } from '@fortawesome/pro-regular-svg-icons/faShare';
// import { faPencil } from '@fortawesome/pro-regular-svg-icons/faPencil';
// import { faTrash } from '@fortawesome/pro-regular-svg-icons/faTrash';

const mapContextMenuItems = (clickedItem = {}) => {
  const showShareOption = clickedItem.type === 'file' && clickedItem.isAvailableInSpace;

  const shareOption = {
    id: CONTEXT_OPTION_IDS.share,
    displayText: 'Share',
    icon: faShare,
  };

  return ([
    {
      id: CONTEXT_OPTION_IDS.open,
      displayText: 'Open',
      icon: faExpandArrowsAlt,
    },
    ...(showShareOption ? [shareOption] : []),
    // {
    //   id: CONTEXT_OPTION_IDS.rename,
    //   displayText: 'Rename',
    //   icon: faPencil,
    // },
    // {
    //   id: CONTEXT_OPTION_IDS.trash,
    //   displayText: 'Move to Trash',
    //   icon: faTrash,
    // },
  ]);
};

export default mapContextMenuItems;
