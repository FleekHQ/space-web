import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    width: 344,
    display: 'flex',
    padding: '20px 35px',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textAreaRoot: {
    padding: '11px 26px',
    '& > textarea': {
      textAlign: 'center',
    },
  },
  checkboxRoot: {
    padding: 0,
    color: theme.palette.palette.black,
    '& svg': {
      width: 13,
      height: 13,
      marginRight: 6,
    },
  },
  checkboxColorPrimary: {
    '&.Mui-checked': {
      color: theme.palette.palette.blue1,
    },
  },
  formControlLabelRoot: {
    margin: 0,
    userSelect: 'none',
  },
}));
