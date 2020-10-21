import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    borderRadius: 4,
    padding: '4px 15px',
    alignItems: 'center',
    backgroundColor: '#f8dedf',
    border: `1px solid ${theme.palette.palette.red}`,
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 13,
    marginRight: 5,
    color: theme.palette.palette.red,
  },
  messageContainer: {
    display: 'flex',
  },
  buttonIcon: {
    color: theme.palette.palette.white,
    fontSize: 12,
    marginRight: 5,
  },
  buttonText: {
    color: theme.palette.palette.white,
    fontSize: 12,
  },
}));
