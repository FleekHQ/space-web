import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    '& > button': {
      margin: '5px 0',
    },
    '& > button:first-child': {
      marginTop: 0,
    },
  },
  shareWidth: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '14px 0 10px 0',
    '& > .manageLink': {
      cursor: 'pointer',
    },
  },
  collaboratorList: {
    flex: 1,
  },
  copyButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    '&&': {
      borderColor: theme.palette.palette.black,
    },
    '& span': {
      color: theme.palette.palette.black,
    },
  },
  downAngle: {
    fontSize: 18,
    color: theme.palette.palette.black,
    position: 'relative',
    top: 1,
    marginLeft: 5,
  },
}));
