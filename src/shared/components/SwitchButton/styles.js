import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  buttonRoot: {
    color: '#a8a8a8',
    borderColor: '#d9d9d9',
    width: 45,
    height: 22,
    boxSizing: 'border-box',
    padding: 0,
    fontSize: 12,
  },
  enableSelected: {
    '&&&': {
      color: theme.palette.palette.white,
      borderColor: theme.palette.palette.green2,
      backgroundColor: theme.palette.palette.green2,
    },
  },
  disableSelected: {
    '&&&': {
      borderColor: '#ff5b57',
      backgroundColor: '#ff5b57',
      color: theme.palette.palette.white,
    },
  },
}));
