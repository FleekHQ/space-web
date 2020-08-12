import { makeStyles } from '@material-ui/core/styles';

export const userAccountMenu = makeStyles({
  root: {
    color: 'black',
    width: 138,
    margin: '-8px 0',
    '& > li': {
      padding: 0,
      margin: '8px 0',
      cursor: 'pointer',
    },
    '& > li > svg': {
      marginRight: 5,
    },
  },
  padding: {
    padding: '10px 13px',
  },
});

export const useUserBtnStyles = makeStyles((theme) => ({
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
    display: 'flex',
    flexDirection: 'column',
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
    top: '80px !important',
  },
});
