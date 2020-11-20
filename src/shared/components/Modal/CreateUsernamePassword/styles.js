import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: '45px 18px 18px 18px',
    maxWidth: 321,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
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
  title: {
    fontWeight: 600,
    fontSize: 16,
  },
  logo: {
    width: 45,
    marginBottom: 20,
  },
  form: {
    width: '100%',
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
  username: {
    margin: '20px 0px',
  },
  buttonContainer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  submit: {
    marginLeft: 5,
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginTop: -15,
  },
  errorIcon: {
    color: theme.palette.palette.red,
    fontSize: 9,
    marginRight: 2,
  },
  errorMessage: {
    color: theme.palette.palette.red,
    fontSize: 10,
  },
}));
