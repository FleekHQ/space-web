import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  mainContent: {
    flexGrow: 1,
    backgroundColor: theme.palette.palette.gray5,
  },
}));
