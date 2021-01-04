import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  rootMessage: {
    display: 'flex',
    color: theme.palette.palette.white,
    alignItems: 'center',
    '& > svg': {
      color: theme.palette.palette.green2,
      fontSize: 13,
      marginRight: 8,
    },
  },
  snackbarContent: {
    minWidth: 0,
    padding: '8px 15px',
    backgroundColor: theme.palette.palette.black,
  },
  snackbarMessage: {
    padding: 0,
  },
}));
