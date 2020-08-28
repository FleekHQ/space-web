import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 12,
  },
  form: {
    maxWidth: 282,
    display: 'flex',
    flexDirection: 'column',
    '& > *:not(:last-child)': {
      marginBottom: 18,
    },
  },
  textFieldRoot: {
    backgroundColor: theme.palette.palette.black,
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
  iconButton: {
    width: 18,
  },
  icon: {
    fontSize: 14,
    color: theme.palette.palette.gray8,
  },
  submitButton: {
    height: 39,
    fontWeight: 600,
  },
  forgotPasswordLink: {
    fontSize: 14,
    marginTop: 15,
    textDecoration: 'none',
    color: theme.palette.palette.white,
  },
  signUplink: {
    marginTop: 'auto',
    cursor: 'pointer',
    textDecoration: 'none',
    color: theme.palette.palette.white,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  alert: {
    width: '100%',
    padding: '5px 30px',
    height: 'auto',
    borderRadius: 6,
    margin: '12px 0',
    textAlign: 'center',
    color: theme.palette.palette.white,
    backgroundColor: theme.palette.palette.red,
  },
}));
