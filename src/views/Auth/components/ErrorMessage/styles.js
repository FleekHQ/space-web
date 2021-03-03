import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: '0 14px 0 10px',
    marginBottom: '-33px',
    bottom: 0,
    border: '1px solid #EF6A6E',
    height: 33,
    display: 'flex',
    color: '#EF6A6E',
    borderRadius: 4,
    backgroundColor: '#240F10',
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
  },
  contentBox: {
    marginLeft: 7,
    color: theme.palette.common.white,
  },
  link: {
    color: theme.palette.common.white,
  },
}));
