import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    padding: '3px 0',
    display: 'inline-block',
    width: 132,
    backgroundColor: theme.palette.palette.gray5,
    borderRadius: 4,
  },
  subMenu: {
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
  },
}));
