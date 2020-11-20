import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    marginBottom: 12,
    backgroundColor: theme.palette.palette.white,
    borderRadius: 4,
    boxShadow: theme.palette.shadows.main,
    overflow: 'hidden',
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '6px 10px',
  },
  progressBar: {
    height: 9,
    backgroundColor: theme.palette.palette.red,
  },
  button: {
    padding: 0,
    fontSize: 12,
  },
}));
