import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  button: {
    borderRadius: 4,
    padding: '4px 7px',
  },
  border: {
    border: '1px solid #dae1e1',
  },
  menuItem: {
    display: 'block',
  },
  iconAngle: {
    fontSize: 10,
    marginLeft: 6,
  },
  iconCheck: {
    fontSize: 10,
    marginLeft: 4,
  },
  danger: {
    color: theme.palette.palette.red,
  },
}));
