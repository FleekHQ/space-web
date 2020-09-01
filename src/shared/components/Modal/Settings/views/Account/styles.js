import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& > *:not(:last-child)': {
      marginBottom: 10,
    },
  },
  profileContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #dbdbdb',
    borderTopStyle: 'dashed',
    paddingTop: 18,
  },
  input: {
    display: 'none',
  },
  error: {
    marginTop: 10,
    backgroundColor: theme.palette.palette.red,
    color: theme.palette.palette.white,
    textAlign: 'center',
    padding: '6px 0',
    borderRadius: 6,
    minHeight: 25,
    '&:empty': {
      opacity: 0,
      pointerEvents: 'none',
    },
  },
}));
