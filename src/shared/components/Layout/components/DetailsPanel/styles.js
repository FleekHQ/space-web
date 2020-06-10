import { makeStyles } from '@material-ui/core/styles';

export const DETAILS_PANEL_WIDTH = 210;

export default makeStyles((theme) => ({
  root: {
    width: DETAILS_PANEL_WIDTH,
    height: '100%',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.palette.white,
  },
  divider: {
    borderTop: `1px solid ${theme.palette.palette.gray5}`,
  },
}));
