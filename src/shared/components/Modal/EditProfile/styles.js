import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: 16,
    maxWidth: 400,
  },
  textField: {
    marginTop: 15,
  },
  btnRoot: {
    minWidth: 96,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 16,
    '& > *:not(:last-child)': {
      marginRight: 10,
    },
  },
  errorMessage: {
    marginTop: 5,
    color: theme.palette.error.main,
  },
  icon: {
    fontSize: 12,
    color: theme.palette.palette.gray1,
  },
  message: {
    marginTop: 12,
  },
  radioRoot: {
    padding: '0 0 0 8px',
    '& svg': {
      width: 15,
    },
  },
  radioChecked: {
    color: '#006EFF !important',
  },
  radioLabel: {
    marginLeft: 7,
  },
  rootPopover: {
    top: '7px !important',
  },
  editBtn: {
    borderRadius: 4,
    padding: '3px 5px',
    backgroundColor: 'white',
    border: '1px solid #B9BEC8',
  },
  picOption: {
    padding: '3px 14px',
  },
  input: {
    display: 'none',
  },
  btnCancel: {
    border: '1px solid',
  },
}));
