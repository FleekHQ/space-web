import { addItems } from '@events';
import { HOVER_OPTION_IDS } from '@ui/HoverMenu';
import { DELETE_OBJECT_AND_CHILDREN } from '@reducers/storage/bucket';

const hoverMenuItemOnClick = (item, currentPath, dispatch) => (actionId, event) => {
  event.stopPropagation(); // to avoid selecting row by clicking on menu
  switch (actionId) {
    case HOVER_OPTION_IDS.retry: {
      addItems({
        targetPath: currentPath,
        sourcePaths: [item.sourcePath],
      });
      break;
    }
    case HOVER_OPTION_IDS.cancel:
    default:
      dispatch({
        type: DELETE_OBJECT_AND_CHILDREN,
        payload: {
          fullKey: item.fullKey,
          bucket: item.bucket,
        },
      });
      break;
  }
};

export default hoverMenuItemOnClick;
