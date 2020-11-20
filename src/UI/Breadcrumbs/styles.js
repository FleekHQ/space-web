import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    fontSize: 11,
    margin: '0px 9px',
  },
  button: {
    padding: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
    fontSize: 19,
    color: theme.palette.icons.babyBlue,
  },
}));
