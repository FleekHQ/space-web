import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    padding: '7px 5px 10px 20px',
    display: 'inline-block',
    width: 144,
    boxShadow: 'none',
  },
  warningContainer: {
    position: 'relative',
  },
  warningIcon: {
    color: theme.palette.palette.red,
    fontSize: 9,
    position: 'absolute',
    left: -12,
  },
  warningText: {
    color: theme.palette.palette.red,
    fontSize: 9,
  },
  description: {
    fontSize: 9,
    margin: '5px 0px',
    lineHeight: 1.22,
  },
  button: {
    height: 20,
    fontSize: 9,
    fontWeight: 500,
    paddingLeft: 10,
    paddingRight: 10,
  },
}));
