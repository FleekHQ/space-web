import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container:{
    textTransform: 'none',
    padding: 4,
  },
  text: {
    fontSize: 14,
    color: theme.palette.palette.white,
    paddingLeft: 8,
  },
  plusContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${theme.palette.palette.blue2} !important`,
    width: 24,
    height: 24,
    borderRadius: 4,
    marginLeft: 12,
    '&& svg': {
      height: 14,
      width: 14,
    },
  },
}));
