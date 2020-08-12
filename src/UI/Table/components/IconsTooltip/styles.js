import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    display: 'inline-block',
    color: theme.palette.palette.black,
    fontSize: 12,
  },
}));
