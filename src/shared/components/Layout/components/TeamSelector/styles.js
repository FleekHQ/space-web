import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '9px 14px',
  },
  avatarWrapper: {
    flexShrink: 0,
  },
  teamName: {
    marginBottom: 5,
  },
  textWrapper: {
    marginLeft: 14,
    minWidth: 0,
  },
}));