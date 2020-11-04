import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    width: 344,
    display: 'flex',
    padding: '15px 18px 22px 18px',
    alignItems: 'left',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textAreaRoot: {
    marginBottom: 22,
    padding: '11px 26px',
    '& > textarea': {
      textAlign: 'center',
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
  title: {
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 13,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}));
