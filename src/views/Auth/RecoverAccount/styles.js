import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  root: {
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
  textFieldRoot: {
    '& label.Mui-focused, & label.MuiFormLabel-filled': {
      color: theme.palette.palette.white,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.palette.white,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset, &:hover fieldset': {
        borderColor: ({ isError }) => (isError
          ? theme.palette.palette.red
          : theme.palette.palette.gray8
        ),
      },
      '&.Mui-focused fieldset': {
        borderColor: ({ isError }) => (isError
          ? theme.palette.palette.red
          : theme.palette.palette.white
        ),
      },
    },
    '& label.MuiFormLabel-filled + .MuiOutlinedInput-root': {
      '& fieldset, &:hover fieldset': {
        borderColor: ({ isError }) => (isError
          ? theme.palette.palette.red
          : theme.palette.palette.white
        ),
      },
    },
  },
  inputPropsMultiline: {
    borderRadius: 3,
    padding: 11,
    color: theme.palette.palette.white,
    '&.MuiInputBase-root.Mui-disabled': {
      color: theme.palette.palette.white,
    },
  },
}));
