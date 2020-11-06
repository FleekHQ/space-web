import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    maxWidth: 321,
    boxShadow: 'none',
  },
  modalContent: {
    backgroundColor: theme.palette.palette.white,
    padding: '39px 18px 18px 18px',
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > button': {
      width: 94,
    },
  },
  closeButton: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 18,
    top: 18,
  },
  closeIcon: {
    fontSize: 12,
    color: theme.palette.palette.gray1,
  },
  row: {
    marginTop: 17,
  },
  confirmBtn: {
    marginLeft: 12,
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  errorIcon: {
    color: theme.palette.palette.red,
    fontSize: 9,
    marginRight: 5,
  },
  errorMessage: {
    color: theme.palette.palette.red,
    fontSize: 10,
  },
  adornment: {
    position: 'absolute',
    right: 5,
    '& svg': {
      color: theme.palette.palette.gray18,
    },
  },
  iconButton: {
    width: 18,
  },
  icon: {
    fontSize: 14,
    color: theme.palette.palette.gray18,
  },
  title: {
    fontWeight: 600,
    fontSize: 16,
  },
  logo: {
    width: 45,
    marginBottom: 10,
  },
}));
