import { makeStyles } from '@material-ui/core/styles';

export const useUserBtnStyles = makeStyles((theme) => ({
  label: {
    maxWidth: 109,
    '& > p': {
      fontWeight: 500,
    },
  },
  colorInherit: {
    padding: 0,
    fontWeight: 500,
  },
  endIcon: {
    marginLeft: 5,
    marginRight: 0,
    '& > svg': {
      fontSize: '10px !important',
      color: theme.palette.palette.gray1,
    },
  },
}));

export default makeStyles({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  avatarWrapper: {
    flexShrink: 0,
  },
  teamName: {
    marginBottom: 5,
  },
  rootDivider: {
    margin: '0 -13px',
  },
  userBtn: {
    padding: 0,
    '& > span > span > svg': {
      fontSize: 10,
    },
  },
  rootPopover: {
    top: '45px !important',
  },
});
