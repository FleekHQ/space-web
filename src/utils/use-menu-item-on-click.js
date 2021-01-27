import { CONTEXT_OPTION_IDS } from '@ui/ContextMenu';
import {
  openModal,
  SHARING_MODAL,
  DELETE_OBJECT,
  FILE_PREVIEW,
} from '@shared/components/Modal/actions';
import { useDispatch } from 'react-redux';
import { getFileUrl } from '@events/objects';
import { useHistory } from 'react-router-dom';
import copy from 'copy-to-clipboard';

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
    if (clickedItem.uuid && clickedItem.uuid !== '') {
      history.push(`/file/${clickedItem.uuid}`);
    }
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

export const copyLinkAction = ({
  clickedItem,
  dispatch,
}) => {
  // If we do not have a link to copy, we open the share modal
  shareAction({
    clickedItem,
    dispatch,
  });
};

export const copyIPFSHashAction = ({
  clickedItem,
}) => {
  copy(clickedItem.ipfsHash);
};

export const previewAction = ({
  dispatch,
  clickedItem,
}) => dispatch(openModal(FILE_PREVIEW, { object: clickedItem }));

export const downloadAction = (item) => {
  getFileUrl({
    path: item.key,
    bucket: item.sourceBucket,
  }).then((url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = item.name;
    link.click();
  }).catch((err) => {
    /* eslint-disable-next-line no-console */
    console.error(`error downloading file ${item.name}:`, err);
  });
};

const useMenuItemOnClick = ({
  handleContextClose = () => {},
  clickedItem,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return ((
    optionId,
  ) => {
    console.log('option id...', optionId);
    switch (optionId) {
      case CONTEXT_OPTION_IDS.preview:
        previewAction({
          clickedItem,
          dispatch,
        });
        break;
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
        shareAction({
          clickedItem,
          dispatch,
        });
        break;
      case CONTEXT_OPTION_IDS.copyLink:
        copyLinkAction({
          clickedItem,
          dispatch,
        });
        break;
      case CONTEXT_OPTION_IDS.download:
        downloadAction(clickedItem);
        break;
      case CONTEXT_OPTION_IDS.copyIPFSHash:
      default:
        copyIPFSHashAction({
          clickedItem,
        });
        break;
    }
    handleContextClose();
  });
};

export default useMenuItemOnClick;
