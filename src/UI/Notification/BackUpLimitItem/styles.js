import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    cursor: 'default',
    flexDirection: 'column',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  imgAndTitleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 2,
  },
  warningContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 36,
    marginRight: 6,
  },
  greyText: {
    fontSize: 12,
    color: theme.palette.palette.gray1,
  },
  emphasizedText: {
    color: theme.palette.palette.black,
  },
  icon: {
    fontSize: 12,
    color: theme.palette.palette.red,
    marginRight: 5,
  },
  warningText: {
    fontSize: 12,
    color: theme.palette.palette.red,
  },
  sectionContainer: {
    marginLeft: 42,
  },
  timestamp: {
    margin: '7px 0',
  },
  usage: {
    marginTop: 6,
    borderRadius: 3,
    display: 'inline-block',
    padding: '9px 11px 9px 14px',
    border: `1px solid ${theme.palette.palette.gray15}`,
    backgroundColor: theme.palette.palette.white,
  },
  highlighted: {
    backgroundColor: `${theme.palette.palette.blue1}26`,
    '&:hover': {
      backgroundColor: `${theme.palette.palette.blue1}26`,
    },
  },
}));
