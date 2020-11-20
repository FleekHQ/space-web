import { makeStyles } from '@material-ui/core/styles';

export const DETAILS_PANEL_WIDTH = 210;

export default makeStyles((theme) => ({
  root: {
    flex: `0 0 ${DETAILS_PANEL_WIDTH}px`,
    height: '100%',
    maxWidth: DETAILS_PANEL_WIDTH,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.palette.white,
  },
}));
