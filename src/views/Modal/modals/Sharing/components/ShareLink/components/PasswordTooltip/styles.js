import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.palette.blue1,
    padding: 12,
    maxWidth: 175,
  },
  arrow: {
    color: theme.palette.palette.blue1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.palette.white,
    '& > *:not(:last-child)': {
      marginBottom: 5,
    },
  },
  icon: {
    fontSize: 12,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    color: theme.palette.palette.blue1,
    backgroundColor: theme.palette.palette.white,
    fontSize: 12,
    padding: '3px 10px',
  },
}));
