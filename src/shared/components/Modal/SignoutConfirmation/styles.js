import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: '12px 15px',
    maxWidth: 345,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 16,
    '& > button': {
      width: 84,
    },
    '& > *:not(:last-child)': {
      marginRight: 10,
    },
  },
  errorMessage: {
    marginTop: 5,
    color: theme.palette.palette.red,
  },
  icon: {
    fontSize: 12,
    color: theme.palette.palette.gray1,
  },
  error: {
    marginTop: 10,
    backgroundColor: theme.palette.palette.red,
    color: theme.palette.palette.white,
    textAlign: 'center',
    padding: '6px 0',
    borderRadius: 6,
    minHeight: 25,
    '&:empty': {
      opacity: 0,
      pointerEvents: 'none',
    },
  },
}));
