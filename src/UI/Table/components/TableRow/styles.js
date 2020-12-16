import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& th:first-child': {
      paddingLeft: 4,
    },
    '& th:last-child': {
      paddingRight: 4,
    },
    '& td:first-child': {
      paddingLeft: 4,
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    },
    '& td:last-child': {
      paddingRight: 4,
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    },
    '&$hover:hover': {
      borderRadius: 4,
      backgroundColor: theme.palette.palette.white,
    },
  },
  hover: {},
}));
