import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  button: {
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 24,
  },
  fill: {
    fontSize: 16,
    position: 'relative',
    top: -1,
    left: 16,
  },
  outline: {
    color: theme.palette.palette.gray1,
    position: 'relative',
    left: -16,
    fontSize: 18,
    top: -1,
  },
  inactive: {
    opacity: 0,
  },
  active: {
    color: theme.palette.palette.yellow,
  },
}));
