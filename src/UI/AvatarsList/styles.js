import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 5,
  },
  hiddenNumber: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: ({ avatarSize }) => avatarSize,
    height: ({ avatarSize }) => avatarSize,
    userSelect: 'none',
  },
});
