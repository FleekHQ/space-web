import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    position: 'fixed',
    display: 'none',
    backgroundColor: '#e0e0e0',
    zIndex: 1000,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 400,
    height: 160,
    padding: 20,
    border: '1px dashed black',
    borderRadius: 6,
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});
