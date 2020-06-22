import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& > *:not(:last-child)': {
      borderBottom: `1px solid ${theme.palette.palette.gray4}`,
    },
  },
  header: {
    padding: '10px 25px',
  },
  memberInput: {
    padding: '13px 25px',
  },
  collaboratorList: {
    flex: 1,
    overflow: 'auto',
    padding: '12px 25px',
    '& div > p': {
      maxWidth: 260,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
  footer: {
    padding: '14px 25px 23px',
  },
}));
