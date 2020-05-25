import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    userSelect: 'none',
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.palette.blue1,
      '& p': {
        color: theme.palette.palette.blue1,
      }
    },
    '&:first-child': {
      borderTopRightRadius: 4,
      borderTopLeftRadius: 4,
    },
    '&:last-child': {
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4,
    },
  },
  iconLabelContainer: {
    display: 'inline-block',
  },
  icon: {
    fontSize: 15,
    marginRight: 6,
  },
  label: {
    fontSize: 14,
    display: 'inline-block',
  },
  angleRightIcon: {
    alignSelf: 'flex-end',
  },
}));
