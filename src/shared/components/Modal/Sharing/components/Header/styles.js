import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    marginLeft: 8,
    fontWeight: 500,
  },
  settingsButton: {
    padding: 3,
    borderRadius: 5,
  },
  settingsIcon: {
    color: theme.palette.icons.grey,
    fontSize: 18,
  },
}));
