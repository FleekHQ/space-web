import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 12,
  },
  input: {
    height: 28,
    width: '100%',
  },
  iconButton: {
    padding: 0,
    width: 15,
  },
  placeholder: {
    '&&::placeholder': {
      color: theme.palette.palette.gray1,
    },
  },
  button: {
    height: 28,
    fontSize: 12,
    padding: '0 11px',
    marginLeft: 5,
  },
  saveButton: {
    minWidth: 42,
  },
}));
