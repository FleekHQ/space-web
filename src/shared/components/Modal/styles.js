import { makeStyles } from '@material-ui/core/styles';
import { DETAILS_PANEL_WIDTH } from '@shared/components/DetailsPanel/styles';
import { SIDEBAR_WIDTH } from '@shared/components/Layout/components/Sidebar/styles';

export default makeStyles({
  toastsContainer: {
    position: 'fixed',
    left: SIDEBAR_WIDTH + 12,
    right: DETAILS_PANEL_WIDTH + 12,
    bottom: 12,
    zIndex: 1,
  },
});
