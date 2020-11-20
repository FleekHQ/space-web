import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    maxWidth: 730,
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
    height: 'calc(100% - 58px)',
  },
  content: {
    flex: 1,
    padding: 27,
    height: '100%',
    overflow: 'auto',
    backgroundColor: theme.palette.palette.gray5,
  },
  closeIcon: {
    fontSize: 16,
  },
  sidebar: {
    listStyleType: 'none',
    padding: '16px 25px',
    margin: 0,
    '& > li:not(:last-child)': {
      marginBottom: 10,
    },
  },
}));
