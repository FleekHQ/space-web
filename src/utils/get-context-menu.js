import { CONTEXT_OPTION_IDS } from '@ui/ContextMenu';
import { faExpandArrowsAlt } from '@fortawesome/pro-regular-svg-icons/faExpandArrowsAlt';
import { faDownload } from '@fortawesome/pro-regular-svg-icons/faDownload';
import { faShare } from '@fortawesome/pro-regular-svg-icons/faShare';
import { faTrash } from '@fortawesome/pro-regular-svg-icons/faTrash';
import { faLink } from '@fortawesome/pro-regular-svg-icons/faLink';
import { faEye } from '@fortawesome/pro-regular-svg-icons/faEye';

const mapContextMenuItems = ({
  object = {},
  t,
}) => {
  if (!object) {
    return [];
  }

  if (object.isUploading && object.error) {
    return [];
  }

  const isFile = object.type === 'file' && object.isAvailableInSpace;

  const shareOption = {
    id: CONTEXT_OPTION_IDS.share,
    displayText: t('tableMenu.share'),
    icon: faShare,
    iconSize: 10,
    type: 'option',
  };

  const getLinkOption = {
    id: CONTEXT_OPTION_IDS.copyLink,
    displayText: t('tableMenu.copyLink'),
    icon: faLink,
    iconSize: 10,
    type: 'option',
  };

  const previewOption = {
    id: CONTEXT_OPTION_IDS.preview,
    displayText: t('tableMenu.preview'),
    icon: faEye,
    iconSize: 10,
    type: 'option',
  };

  const downloadOption = {
    id: CONTEXT_OPTION_IDS.download,
    displayText: t('tableMenu.download'),
    icon: faDownload,
    iconSize: 10,
    type: 'option',
  };

  const openOption = {
    id: CONTEXT_OPTION_IDS.open,
    displayText: t('tableMenu.open'),
    icon: faExpandArrowsAlt,
    iconSize: 10,
    type: 'option',
  };

  const copyIpfsHashOption = {
    id: CONTEXT_OPTION_IDS.copyIPFSHash,
    displayText: t('tableMenu.copyIpfsHash'),
    image: `${process.env.PUBLIC_URL}/assets/images/ipfs.png`,
    iconSize: 10,
    type: 'option',
  };

  const copyDealIdOption = {
    id: CONTEXT_OPTION_IDS.copyDealId,
    displayText: object.dealId ? t('tableMenu.copyDealId') : t('tableMenu.dealIdPending'),
    image: `${process.env.PUBLIC_URL}/assets/images/filecoin.png`,
    iconSize: 10,
    type: 'option',
    disabled: !object.dealId,
  };

  return ([
    ...(isFile ? [previewOption] : []),
    ...(!isFile ? [openOption] : []),
    ...(isFile ? [downloadOption] : []),
    ...(isFile ? [{ type: 'divider' }] : []),
    ...(isFile ? [shareOption] : []),
    ...(isFile ? [getLinkOption] : []),
    {
      type: 'divider',
    },
    ...(isFile ? [copyIpfsHashOption, { type: 'divider' }] : []),
    ...(isFile ? [copyDealIdOption, { type: 'divider' }] : []),
    {
      id: CONTEXT_OPTION_IDS.trash,
      displayText: t('tableMenu.delete'),
      icon: faTrash,
      iconSize: 10,
      type: 'option',
      disabled: true,
    },
  ]);
};

export default mapContextMenuItems;
