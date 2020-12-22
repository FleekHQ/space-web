import { HOVER_OPTION_IDS } from '@ui/HoverMenu';
import { faSyncAlt } from '@fortawesome/pro-regular-svg-icons/faSyncAlt';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';

const mapHoverMenuItems = (hoveredItem) => {
  if (!hoveredItem || !hoveredItem.isUploading) {
    return [];
  }
  if (hoveredItem.error) {
    return ([
      {
        id: HOVER_OPTION_IDS.retry,
        icon: faSyncAlt,
      },
      {
        id: HOVER_OPTION_IDS.cancel,
        icon: faTimes,
      },
    ]);
  }
  return ([
    {
      id: HOVER_OPTION_IDS.cancel,
      icon: faTimes,
    },
  ]);
};

export default mapHoverMenuItems;
