import { CONTEXT_OPTION_IDS } from '@ui/ContextMenu';
import { faExpandArrowsAlt } from '@fortawesome/pro-regular-svg-icons/faExpandArrowsAlt';
import { faShare } from '@fortawesome/pro-regular-svg-icons/faShare';
// import { faPencil } from '@fortawesome/pro-regular-svg-icons/faPencil';
// import { faTrash } from '@fortawesome/pro-regular-svg-icons/faTrash';

const mapContextMenuItems = () => ([
  {
    id: CONTEXT_OPTION_IDS.open,
    displayText: 'Open',
    icon: faExpandArrowsAlt,
  },
  {
    id: CONTEXT_OPTION_IDS.share,
    displayText: 'Share',
    icon: faShare,
  },
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

export default mapContextMenuItems;
