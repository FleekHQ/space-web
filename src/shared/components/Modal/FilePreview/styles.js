import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  backdrop: {
    backgroundColor: theme.palette.palette.black,
  },
  container: {
    outline: 'none',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  mainContentContainer: {
    width: '100%',
  },
  mainContent: {
    marginTop: '20px',
    overflow: 'hidden',
    display: 'flex',
    // 100% - topBar - margin below topbar
    height: 'calc(100% - 66px - 20px)',
    padding: '0px 300px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    fontSize: 40,
    color: theme.palette.palette.spaceBlue,
  },
}));
