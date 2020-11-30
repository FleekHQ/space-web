import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  iconSizeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    width: 25,
  },
  checkIcon: {
    fontSize: 11,
    color: theme.palette.palette.green2,
  },
  notAvailableLocally: {
    color: '#7F8185',
  },
  loadingIcon: {
    fontSize: 11,
    color: theme.palette.palette.spaceBlue,
  },
}));
