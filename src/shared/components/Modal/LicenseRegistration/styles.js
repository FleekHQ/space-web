import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: 400,
    padding: '25px 32px 22px 32px',
  },
  btn: {
    minWidth: 96,
  },
  icon: {
    fontSize: 55,
    color: '#00ca71',
  },
  textField: {
    '& input': {
      textAlign: 'center',
    },
  },
  errorMessage: {
    marginTop: 5,
    color: theme.palette.palette.red,
  },
}));
