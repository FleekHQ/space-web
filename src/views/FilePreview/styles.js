import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  container: {
    backgroundColor: '#151515',
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
