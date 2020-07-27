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
    color: theme.palette.palette.green,
    fontSize: 14,
  },
  loader: {
    margin: '0 10px -2px 0',
    color: theme.palette.palette.blue1,
  },
}));
