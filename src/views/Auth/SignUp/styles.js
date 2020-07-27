import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  signupRoot: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    height: 238,
    maxWidth: 282,
  },
  form: {
    display: 'inherit',
    flexDirection: 'column',
    '& > *': {
      margin: '8px 0',
    },
  },
  buttonRoot: {
    height: 39,
    borderRadius: 3,
    fontWeight: 600,
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: theme.palette.palette.white,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  textFieldRoot: {
    '& label.Mui-focused, & label.MuiFormLabel-filled': {
      color: theme.palette.palette.white,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.palette.white,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset, &:hover fieldset': {
        borderColor: theme.palette.palette.gray8,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.palette.white,
      },
    },
    '& label.MuiFormLabel-filled + .MuiOutlinedInput-root': {
      '& fieldset, &:hover fieldset': {
        borderColor: theme.palette.palette.white,
      },
    },
  },
  inputPropsRoot: {
    borderRadius: 3,
  },
  inputPropsInput: {
    height: 39,
    width: 282,
    padding: 11,
    boxSizing: 'border-box',
    color: theme.palette.palette.white,
    backgroundColor: theme.palette.palette.black,
  },
  inputLabelPropsRoot: {
    top: 3,
  },
  inputLabelPropsShrink: {
    top: 0,
  },
  alert: {
    width: 'auto',
    padding: '5px 30px',
    height: 25,
    borderRadius: 6,
    margin: '12px 0',
    textAlign: 'center',
    color: theme.palette.palette.white,
    backgroundColor: theme.palette.palette.red,
  },
}));
