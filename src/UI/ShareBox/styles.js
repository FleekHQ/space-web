import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.palette.white,
    border: `1px solid ${theme.palette.palette.gray4}`,
    borderRadius: 4,
  },
  header: {
    display: 'flex',
    padding: '9px 9px 6px',
  },
  divider: {
    borderTop: `1px solid ${theme.palette.palette.gray5}`,
  },
  content: {
    padding: '6px 9px 9px',
  },
  objectsList: {
    padding: '3px 0',
  },
  iconWrapper: {
    display: 'flex',
    marginRight: 8,
    width: 18,
    borderRadius: 4,
    overflow: 'hidden',
    flexShrink: 0,
  },
  avatar: {
    marginRight: 6,
  },
  username: {
    paddingTop: 3,
  },
  objectItem: {
    padding: '4px 0',
    width: '100%',
    justifyContent: 'flex-start',
  },
  viewAllBtn: {
    padding: 5,
  },
}));
