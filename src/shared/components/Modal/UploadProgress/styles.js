import { makeStyles } from '@material-ui/core/styles';
import { DETAILS_PANEL_WIDTH } from '@shared/components/DetailsPanel/styles';
import { SIDEBAR_WIDTH } from '@shared/components/Layout/components/Sidebar/styles';

export default makeStyles((theme) => ({
  root: {
    position: 'fixed',
    left: SIDEBAR_WIDTH + 12,
    right: DETAILS_PANEL_WIDTH + 12,
    bottom: ({ order }) => 12 + 50 * order,
    backgroundColor: theme.palette.palette.white,
    borderRadius: 4,
    boxShadow: theme.palette.shadows.main,
    overflow: 'hidden',
    zIndex: 1,
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '6px 10px',
  },
  progressBar: {
    height: 9,
    backgroundColor: theme.palette.palette.gray9,
    '&:before': {
      content: '""',
      display: 'block',
      width: ({ progress }) => `${progress * 100}%`,
      height: '100%',
      backgroundColor: theme.palette.palette.blue1,
      transition: 'width ease-out 0.5s',
    },
  },
  button: {
    padding: 0,
    fontSize: 12,
  },
}));
