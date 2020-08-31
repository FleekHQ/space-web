import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: 7,
    alignItems: 'center',
    borderRadius: 3,
    border: '1px solid #f1f1f1',
    width: 'fit-content',
    backgroundColor: theme.palette.palette.white,
  },
  iconContainer: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
}));
