import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    borderRadius: 4,
    padding: '10px 15px',
    alignItems: 'center',
    backgroundColor: '#f8dedf',
    border: `1px solid ${theme.palette.palette.red}`,
  },
  icon: {
    fontSize: 13,
    marginRight: 5,
    color: theme.palette.palette.red,
  },
}));
