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
  },
  textField: {
    marginTop: 15,
  },
  btnRoot: {
    minWidth: 96,
    backgroundColor: theme.palette.common.black,
    '&:hover': {
      backgroundColor: theme.palette.common.black,
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 16,
    '& > *:not(:last-child)': {
      marginRight: 10,
    },
  },
  errorMessage: {
    marginTop: 5,
    color: theme.palette.error.main,
  },
  icon: {
    fontSize: 12,
    color: theme.palette.palette.gray1,
  },
  message: {
    marginTop: 12,
  },
}));
