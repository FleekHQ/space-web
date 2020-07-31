import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    cursor: 'default',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  button: {
    fontSize: 12,
    height: 26,
    width: 57,
    boxSizing: 'border-box',
  },
  rejectButton: {
    borderColor: theme.palette.palette.red,
    color: theme.palette.palette.red,
  },
  files: {
    margin: '6px 0',
    '& > *:not(:last-child)': {
      marginBottom: 5,
    },
  },
  buttonContainer: {
    marginTop: 6,
    display: 'flex',
    '& > *:not(:last-child)': {
      marginRight: 5,
    },
  },
  content: {
    flex: 1,
    marginLeft: 8,
  },
}));
