import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
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
      },
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 14,
  },
  label: {
    fontSize: 12,
    display: 'inline-block',
  },
  angleRightIcon: {
    alignSelf: 'flex-end',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 15,
    marginRight: 6,
  },
}));
