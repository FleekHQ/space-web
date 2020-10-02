import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    backgroundColor: theme.palette.palette.gray12,
    borderRadius: 2,
    padding: '2px 3px',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'fit-content',
  },
  inactive: {
    color: `${theme.palette.palette.gray1} !important`,
  },
  warning: {
    color: `${theme.palette.palette.red} !important`,
    cursor: 'pointer',
  },
  localStorageContainer: {
    width: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  localStorage: {
    fontSize: 11,
    color: theme.palette.palette.blue2,
  },
  spaceStorageContainer: {
    width: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceStorage: {
    fontSize: 11,
    color: theme.palette.palette.green2,
    margin: '0px 4px',
  },
  shareContainer: {
    display: 'inline-flex',
    margin: '0px 4px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sharedIcon: {
    fontSize: 11,
    color: theme.palette.palette.pink,
  },
  sharedText: {
    display: 'inline-block',
    color: theme.palette.palette.black,
    fontSize: 9,
    marginLeft: 2,
  },
  paperPopover: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
}));
