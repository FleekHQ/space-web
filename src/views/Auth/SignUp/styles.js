import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  dividerRoot: {
    color: '#5A5A5A',
    backgroundColor: '#5A5A5A',
  },
  signupRoot: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    height: 238,
  },
  form: {
    width: 282,
    display: 'inherit',
    flexDirection: 'column',
    '& > *': {
      margin: '8px 0',
    },
    '& > #tfUsername-helperText': {
      margin: '0 0 6px 0',
    },
  },
  buttonRoot: {
    height: 39,
    borderRadius: 3,
    fontWeight: 600,
    margin: '12px 0 0 0',
    '&.Mui-disabled': {
      color: theme.palette.palette.white,
      backgroundColor: theme.palette.palette.gray11,
    },
  },
  buttonContained: {
    color: theme.palette.palette.white,
    borderColor: theme.palette.palette.white,
    '&.Mui-disabled': {
      color: theme.palette.palette.white,
      borderColor: theme.palette.palette.white,
    },
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: theme.palette.palette.gray7,
    '& > span': {
      color: theme.palette.palette.white,
    },
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  iconButtonRoot: {
    padding: 0,
    color: theme.palette.palette.gray1,
    '& > .MuiIconButton-label': {
      fontSize: 14,
      paddingRight: 12,
    },
  },
  alert: {
    width: 'auto',
    padding: '5px 30px',
    height: 'auto',
    borderRadius: 6,
    margin: '12px 0',
    textAlign: 'center',
    color: theme.palette.palette.white,
    backgroundColor: theme.palette.palette.red,
  },
}));
