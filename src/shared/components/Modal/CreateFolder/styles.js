import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: '15px 18px 19px',
    maxWidth: 321,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textField: {
    marginTop: 20,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
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
    fontSize: 13,
    color: theme.palette.palette.gray1,
  },
}));
