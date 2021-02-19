import { CONTEXT_OPTION_IDS } from '@ui/ContextMenu';
import {
  openModal,
  SHARING_MODAL,
  DELETE_OBJECT,
  FILE_PREVIEW,
} from '@shared/components/Modal/actions';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { downloadFile } from '@events/objects';
import { useHistory } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { downloadFromUrl } from '@utils';
import { openToast } from '@shared/components/Toast/actions';

export const openAction = ({
  clickedItem,
  dispatch,
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
      dispatch(openModal(FILE_PREVIEW, { object: clickedItem }));
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

/* eslint-disable */
export const copyLinkAction = ({
  clickedItem,
  dispatch,
  t,
}) => {
  const fileUrl = `${window.location.origin}/file/${clickedItem.uuid}`;

  copy(fileUrl);
  dispatch(openToast({
    message: t('modals.sharingModal.shareLink.linkCopied'),
  }));
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

export const downloadAction = ({
  clickedItem,
  downloads,
}) => {
  const fileUrl = downloads[clickedItem.uuid] && downloads[clickedItem.uuid].link;
  if (fileUrl) {
    downloadFromUrl(
      fileUrl,
      clickedItem.name,
    );
    return;
  }

  downloadFile({
    path: clickedItem.key,
    fileSize: clickedItem.size,
    bucket: clickedItem.sourceBucket,
    uuid: clickedItem.uuid,
    filename: clickedItem.name,
  });
};

const useMenuItemOnClick = ({
  handleContextClose = () => {},
  clickedItem,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  const downloads = useSelector((state) => state.downloads);

  return ((
    optionId,
  ) => {
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
          dispatch,
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
          t,
        });
        break;
      case CONTEXT_OPTION_IDS.download:
        downloadAction({
          clickedItem,
          downloads,
        });
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
