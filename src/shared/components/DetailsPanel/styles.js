import { makeStyles } from '@material-ui/core/styles';

export const DETAILS_PANEL_WIDTH = 210;

export default makeStyles((theme) => ({
  root: {
    height: '100%',
    width: DETAILS_PANEL_WIDTH,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.palette.white,
  },
}));
