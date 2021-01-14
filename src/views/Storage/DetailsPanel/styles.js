import { makeStyles } from '@material-ui/core/styles';

import { DETAILS_PANEL_WIDTH } from '@shared/components/DetailsPanel/styles';

export default makeStyles(() => ({
  root: {
    overflow: 'hidden',
    transition: 'flex-basis 0.2s ease',
    flexGrow: 0,
    flexBasis: 0,
    flexShrink: 0,
  },
  expanded: {
    flexBasis: DETAILS_PANEL_WIDTH,
  },
}));
