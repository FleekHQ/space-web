import { CONTEXT_OPTION_IDS } from '@ui/ContextMenu';
import { openModal, SHARING_MODAL, DELETE_OBJECT } from '@shared/components/Modal/actions';
import { useDispatch } from 'react-redux';
import { openObject } from '@events';
import { useHistory } from 'react-router-dom';

export const openAction = ({
  clickedItem,
  history,
}) => {
  if (clickedItem.isUploading && clickedItem.error) {
    return;
  }
  if (clickedItem.type === 'folder') {
    const redirectUrl = `/home/${clickedItem.key}`;
    history.push(redirectUrl);
  } else if (clickedItem.type === 'file') {
    const rowBucket = clickedItem.sourceBucket || clickedItem.bucket;
    openObject({
      path: clickedItem.key,
      dbId: clickedItem.dbId,
      bucket: rowBucket,
      name: clickedItem.name,
      ipfsHash: clickedItem.ipfsHash,
      isPublicLink: clickedItem.isPublicLink,
      fullKey: clickedItem.fullKey,
    });
  }
};

export const deleteAction = ({
  clickedItem,
  dispatch,
}) => dispatch(openModal(DELETE_OBJECT, { item: clickedItem }));

export const shareAction = ({
  clickedItem,
  dispatch,
}) => dispatch(openModal(SHARING_MODAL, { selectedObjects: [clickedItem] }));

const useMenuItemOnClick = ({
  handleContextClose = () => {},
  clickedItem,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return ((
    optionId,
  ) => {
    switch (optionId) {
      case CONTEXT_OPTION_IDS.open:
        openAction({
          clickedItem,
          history,
        });
        break;
      case CONTEXT_OPTION_IDS.trash:
        deleteAction({
          clickedItem,
          dispatch,
        });
        break;
      case CONTEXT_OPTION_IDS.share:
      default:
        shareAction({
          clickedItem,
          dispatch,
        });
        break;
    }
    handleContextClose();
  });
};

export default useMenuItemOnClick;
