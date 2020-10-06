import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 24,
    textAlign: 'center',
  },
  emoji: {
    width: 53,
  },
  title: {
    fontSize: 20,
    margin: '8px 0 7px',
  },
  plusIcon: {
    position: 'relative',
    top: 2,
    width: 14,
    height: 14,
    padding: 2,
    backgroundColor: theme.palette.palette.white,
    borderRadius: '50%',
    boxShadow: '0 0 9px 0 rgba(222, 222, 222, 0.8)',
  },
}));
