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
    padding: 0,
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
  statusChip: {
    fontSize: 12,
    borderRadius: 3,
    padding: '6px 10px',
    display: 'inline-block',
  },
  accepted: {
    color: theme.palette.palette.green2,
    backgroundColor: theme.palette.palette.green5,
  },
  rejected: {
    color: theme.palette.palette.red,
    backgroundColor: theme.palette.palette.red2,
  },
}));
