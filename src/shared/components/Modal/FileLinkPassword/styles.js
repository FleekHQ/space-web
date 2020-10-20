import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: 321,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 12,
    color: theme.palette.palette.gray1,
  },
  lockIconContainre: {
    '& svg *': {
      fill: 'url(#lgrad)',
    },
  },
  lockIcon: {
    fontSize: 41,
    color: theme.palette.palette.gray1,
  },
  errorIcon: {
    fontSize: 12,
  },
  btnRoot: {
    minWidth: 76,
  },
}));
