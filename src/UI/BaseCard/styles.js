import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: ({ padding = '12px 25px' }) => padding,
    backgroundColor: theme.palette.palette.white,
    minHeight: 56,
    border: `1px solid ${theme.palette.palette.gray4}`,
    borderRadius: 4,
  },
}));
