import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    maxHeight: 550,
    height: '100%',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 58,
    padding: '0 25px',
    borderBottom: `1px solid ${theme.palette.palette.gray4}`,
    boxSizing: 'border-box',
  },
  bodyContainer: {
    display: 'flex',
    flex: 1,
    height: '100%',
  },
  content: {
    flex: 1,
    height: '100%',
    overflow: 'auto',
    backgroundColor: theme.palette.palette.gray5,
  },
  closeIcon: {
    fontSize: 16,
  },
  sidebar: {
    listStyleType: 'none',
    padding: '0 0 16px',
    width: 216,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  selectedItem: {
    backgroundColor: 'rgba(0, 110, 255, 0.1)',
    '&&& p': {
      fontWeight: 500,
    },
  },
  sidebarItem: {
    height: 24,
    margin: '0 25px',
    display: 'flex',
    borderRadius: 3,
    paddingLeft: 9,
    '& > button': {
      display: 'flex',
      width: '100%',
      justifyContent: 'flex-start',
    },
  },
  userContainer: {
    display: 'flex',
    padding: '12px 25px',
  },
  userAvatar: {
    marginRight: 10,
  },
  usernameContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 'calc(100% - 48px)',
    '& > :first-child': {
      marginBottom: 3,
      fontWeight: 500,
    },
  },
  divider: {
    marginBottom: 14,
  },
  contentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 27px 10px 55px',
    '& > :first-child': {
      fontSize: 18,
      fontWeight: 600,
    },
    '& > button > svg': {
      fontSize: 34,
      color: '#B9BEC8',
    },
  },
  contentBody: {
    height: 'calc(100% - 54px)',
    padding: '0 90px 0 55px',
    overflow: 'auto',
    paddingBottom: 27,
  },
}));
