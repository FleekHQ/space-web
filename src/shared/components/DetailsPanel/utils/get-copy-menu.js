import { CONTEXT_OPTION_IDS } from '@ui/ContextMenu';
import { faLink } from '@fortawesome/pro-regular-svg-icons/faLink';

const mapCopyMenuItems = (t) => ([
  {
    id: CONTEXT_OPTION_IDS.copyLink,
    displayText: t('contextMenu.copyLink'),
    icon: faLink,
    disabled: true,
  },
  {
    id: CONTEXT_OPTION_IDS.copyIPFSHash,
    displayText: t('contextMenu.copyIPFSHash'),
    image: `${process.env.PUBLIC_URL}/assets/images/ipfs-logo.svg`,
  },
]);

export default mapCopyMenuItems;
