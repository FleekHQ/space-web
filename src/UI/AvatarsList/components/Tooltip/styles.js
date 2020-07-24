import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.palette.white,
    border: `1px solid ${theme.palette.palette.gray4}`,
    boxShadow: theme.palette.shadows.main,
    padding: '0 7px 5px',
    marginTop: 5,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
  },
  typography: {
    marginLeft: 4,
  },
}));
