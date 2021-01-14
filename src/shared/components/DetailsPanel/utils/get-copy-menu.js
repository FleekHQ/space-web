import { CONTEXT_OPTION_IDS } from '@ui/ContextMenu';
import { faLink } from '@fortawesome/pro-regular-svg-icons/faLink';

const mapContextMenuItems = (t) => ([
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
    displayText: t('contextMenu.copyDealId'),
    image: `${process.env.PUBLIC_URL}/assets/images/filecoin-logo.svg`,
  },
]);

export default mapContextMenuItems;
