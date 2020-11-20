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
  subtitleContainer: {
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
  box: {
    margin: '6px 0',
    borderRadius: 3,
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: '9px 11px 9px 14px',
    backgroundColor: theme.palette.palette.gray10,
  },
  highlighted: {
    backgroundColor: `${theme.palette.palette.blue1}26`,
    '&:hover': {
      backgroundColor: `${theme.palette.palette.blue1}26`,
    },
  },
  bold: {
    fontWeight: 600,
  },
  text: {
    fontSize: 12,
  },
  description: {
    marginBottom: 6,
    whiteSpace: 'normal',
    wordBreak: 'break-word',
  },
}));
