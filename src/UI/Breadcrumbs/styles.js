import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 12,
    marginLeft: 17,
    height: 25,
  },
  separator: {
    fontSize: 11,
    margin: '0px 9px',
  },
  button: {
    padding: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
    fontSize: 19,
    color: theme.palette.icons.babyBlue,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 500,
  },
}));
