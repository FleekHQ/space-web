import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 13px 10px 10px',
    backgroundColor: theme.palette.palette.black,
    borderRadius: 4,
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 12,
    zIndex: 10,
  },
  iconCheck: {
    color: theme.palette.palette.green2,
    fontSize: 13,
    marginRight: 7,
  },
  text: {
    color: theme.palette.palette.white,
    fontSize: 14,
  },
}));
