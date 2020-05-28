import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    position: 'absolute',
    left: ({ left }) => left,
    bottom: ({ bottom }) => bottom,
    display: 'inline-block',
    width: 132,
    backgroundColor: theme.palette.palette.gray5,
    borderRadius: 4,
  },
}));
