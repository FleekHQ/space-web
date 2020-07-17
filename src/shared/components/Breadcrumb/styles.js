import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    '& > div:first-child': {
      marginRight: 5,
    },
  },
  typographyRoot: {
    fontWeight: 500,
    textDecoration: 'none',
  },
});
