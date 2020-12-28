import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 61,
    textAlign: 'center',
  },
  emoji: {
    width: 40,
  },
  title: {
    fontSize: 20,
    margin: '8px 0 7px',
  },
  plusIcon: {
    width: 14,
    height: 14,
    padding: 2,
    marginBottom: -2,
    backgroundColor: theme.palette.palette.white,
    borderRadius: '50%',
    boxShadow: '0 0 9px 0 rgba(222, 222, 222, 0.8)',
  },
  dragndropImg: {
    marginTop: 25,
    width: 298,
    opacity: 0.5,
  },
}));
