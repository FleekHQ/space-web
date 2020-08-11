import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '9px 14px',
    borderTop: `solid 1px ${theme.palette.palette.gray4}`,
    borderBottom: `solid 1px ${theme.palette.palette.gray4}`,
  },
  avatarWrapper: {
    flexShrink: 0,
  },
  teamName: {
    marginBottom: 5,
  },
  textWrapper: {
    minWidth: 0,
  },
}));
