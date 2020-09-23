import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  title: {
    fontWeight: 500,
    fontSize: 12,
  },
  text: {
    fontSize: 12,
    display: 'inline-block',
  },
  usageLine: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  labelContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storageIconContainer: {
    width: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  localStorage: {
    fontSize: 11,
    color: theme.palette.palette.blue2,
  },
  spaceStorage: {
    fontSize: 12,
    color: theme.palette.palette.green2,
  },
  warningIcon: {
    fontSize: 10,
    color: theme.palette.palette.red,
    marginRight: 3,
  },
  warningText: {
    color: theme.palette.palette.red,
  },
  paperPopover: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
}));
