/* eslint-disable max-len */
import { withStyles } from '@material-ui/core/styles';

import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faFolder as faFolderSolid } from '@fortawesome/pro-solid-svg-icons/faFolder';
import { faPresentation as faPresentationSolid } from '@fortawesome/pro-solid-svg-icons/faPresentation';
import { faAlignLeft as faAlignLeftSolid } from '@fortawesome/pro-solid-svg-icons/faAlignLeft';
import { faVolume } from '@fortawesome/pro-regular-svg-icons/faVolume';
import { faVideo } from '@fortawesome/pro-regular-svg-icons/faVideo';
import { faGhost } from '@fortawesome/pro-regular-svg-icons/faGhost';

import IconFAComponent from './IconFA';
import styles from './styles';

config.autoAddCss = false;

// NOTE: Any font-awesome icons must be added here before usage
library.add(
  faFolderSolid,
  faPresentationSolid,
  faAlignLeftSolid,
  faGhost,
  faVolume,
  faVideo,
);

const IconFA = withStyles(styles)(IconFAComponent);

export default IconFA;
