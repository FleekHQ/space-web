import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: 344,
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  modalContent: {
    backgroundColor: theme.palette.palette.white,
    padding: '12px 15px 16px',
    borderRadius: 6,
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
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
  error: {
    marginTop: 10,
    backgroundColor: theme.palette.palette.red,
    color: theme.palette.palette.white,
    textAlign: 'center',
    padding: '6px 0',
    borderRadius: 6,
    minHeight: 25,
    '&:empty': {
      opacity: 0,
      pointerEvents: 'none',
    },
  },
}));
