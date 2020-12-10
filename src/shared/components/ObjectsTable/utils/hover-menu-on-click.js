import { HOVER_OPTION_IDS } from '@ui/HoverMenu';
import { DELETE_OBJECT_AND_CHILDREN } from '@reducers/storage/bucket';

const hoverMenuItemOnClick = (item, dispatch) => (actionId) => {
  switch (actionId) {
    case HOVER_OPTION_IDS.cancel:
    case HOVER_OPTION_IDS.retry:
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
