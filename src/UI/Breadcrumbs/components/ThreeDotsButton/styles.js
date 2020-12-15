import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    width: 26,
    height: 26,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#E5F0FF',
    border: `1px solid ${theme.palette.palette.blue1}`,
  },
  buttonInactive: {
    backgroundColor: '#ECEEF1',
    border: '1px solid #ECEEF1',
  },
  icon: {
    fontSize: 14,
  },
  iconActive: {
    color: theme.palette.palette.blue1,
  },
  iconInactive: {
    color: theme.palette.palette.black,
  },
}));

export default useStyles;
