import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: '8px 15px',
    backgroundColor: theme.palette.palette.white,
    borderRadius: 4,
    boxShadow: theme.palette.shadows.main,
    overflow: 'hidden',
  },
  button: {
    padding: 0,
    fontSize: 14,
  },
  icon: {
    marginRight: 10,
  },
  successIcon: {
    color: theme.palette.palette.green,
    fontSize: 14,
  },
  errorIcon: {
    color: theme.palette.palette.red,
    fontSize: 14,
  },
  loader: {
    color: theme.palette.palette.blue1,
    fontSize: 14,
    marginRight: 10,
  },
}));
