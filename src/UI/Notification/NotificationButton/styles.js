import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  icon: {
    fontSize: 18,
    color: theme.palette.palette.blue1,
  },
  anchorOriginTopRightRectangle: {
    top: 3,
    right: 1,
    width: 12,
    height: 12,
    borderRadius: '50%',
    border: `1px solid ${theme.palette.palette.white}`,
    backgroundColor: theme.palette.palette.red,
  },
}));
