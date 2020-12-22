import { HOVER_OPTION_IDS } from '@ui/HoverMenu';
import { DELETE_OBJECT_AND_CHILDREN } from '@reducers/storage/bucket';
import { addItems } from '@events';

const hoverMenuItemOnClick = (item, dispatch) => (actionId, event) => {
  event.stopPropagation(); // to avoid selecting row by clicking on menu
  switch (actionId) {
    case HOVER_OPTION_IDS.retry: {
      const splitKey = item.key.split('/');
      const targetPath = splitKey.length > 1 ? splitKey.slice(0, splitKey.length - 1).join('/') : splitKey[0];
      addItems({
        targetPath,
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
