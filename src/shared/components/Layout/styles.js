import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    backgroundColor: theme.palette.palette.gray5,
  },
  mainContent: {
    flexGrow: 1,
    minWidth: 0,
    display: 'flex',
  },
}));
