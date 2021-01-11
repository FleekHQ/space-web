import { makeStyles } from '@material-ui/core/styles';

export const DETAILS_PANEL_WIDTH = 214;

export default makeStyles((theme) => ({
  root: {
    height: '100%',
    width: DETAILS_PANEL_WIDTH,
    padding: '0px 24px',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.palette.white,
  },
}));
