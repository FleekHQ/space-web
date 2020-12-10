import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: '15px 20px 20px 18px',
    maxWidth: 321,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textField: {
    marginTop: 15,
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
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
  description: {
    marginTop: 8,
    marginBottom: 14,
  },
  button: {
    height: 34,
  },
}));
