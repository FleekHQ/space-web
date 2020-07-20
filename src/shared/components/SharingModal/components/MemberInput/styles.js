import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  autocomplete: {
    margin: '0 18px',
    '&&&  div': {
      paddingRight: 0,
    },
  },
  emailError: {
    textAlign: 'center',
    margin: '8px 0 -8px 0',
    color: theme.palette.palette.red,
  },
}));
