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
    left: 10,
    color: theme.palette.palette.yellow,
  },
  outline: {
    color: theme.palette.palette.gray1,
    position: 'relative',
    left: -9,
    top: -1,
    fontSize: 18,
  },
  inactive: {
    opacity: 0,
  },
}));
