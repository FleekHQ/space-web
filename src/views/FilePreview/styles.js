import { makeStyles } from '@material-ui/styles';

export default makeStyles(() => ({
  container: {
    backgroundColor: '#151515',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  mainViewContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  filePreviewContainer: {
    width: '100%',
    backgroundColor: 'green',
  },
}));
