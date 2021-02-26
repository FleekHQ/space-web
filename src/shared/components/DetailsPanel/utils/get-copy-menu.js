import { CONTEXT_OPTION_IDS } from '@ui/ContextMenu';
import { faLink } from '@fortawesome/pro-regular-svg-icons/faLink';

const mapCopyMenuItems = (t, object = {}) => ([
  {
    id: CONTEXT_OPTION_IDS.copyLink,
    displayText: t('contextMenu.copyLink'),
    icon: faLink,
  },
  {
    id: CONTEXT_OPTION_IDS.copyIPFSHash,
    displayText: t('contextMenu.copyIPFSHash'),
    image: `${process.env.PUBLIC_URL}/assets/images/ipfs-logo.svg`,
  },
  {
    id: CONTEXT_OPTION_IDS.copyDealId,
    displayText: object.dealId ? t('tableMenu.copyDealId') : t('tableMenu.dealIdPending'),
    image: `${process.env.PUBLIC_URL}/assets/images/filecoin.png`,
    iconSize: 10,
    type: 'option',
    disabled: !object.dealId,
  },
]);

export default mapCopyMenuItems;
