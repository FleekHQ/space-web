import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  colorBorder: {
    borderRadius: 6,
    padding: 4,
    // eslint-disable-next-line max-len
    background: 'linear-gradient(134deg, #ed55eb 18%, #17e0d8 42%, #00ffc2 59%, #ffec06 81%)',
    marginBottom: 11,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '25px 40px',
    borderRadius: 4,
    background: theme.palette.palette.white,
    textAlign: 'center',
  },
  logo: {
    height: 41,
  },
  btnRoot: {
    backgroundColor: theme.palette.palette.blue1,
  },
}));
