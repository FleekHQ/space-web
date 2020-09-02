import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: theme.palette.palette.white,
    '& > *:not(:last-child)': {
      borderBottom: `1px solid ${theme.palette.palette.gray4}`,
    },
  },
  paperModal: {
    backgroundColor: 'transparent',
  },
  header: {
    padding: '10px 25px',
  },
  memberInput: {
    padding: '10px 25px 12px 25px',
  },
  collaboratorList: {
    flex: 1,
    overflow: 'auto',
    maxHeight: 200,
    padding: '12px 25px',
    '& div > p': {
      maxWidth: 260,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
  footer: {
    marginTop: 10,
    marginBottom: 2,
    padding: '12px 25px',
  },
  error: {
    marginTop: 10,
    marginBottom: 2,
  },
}));
