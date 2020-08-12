import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.palette.white,
    border: `1px solid ${theme.palette.palette.gray4}`,
  },
}));
