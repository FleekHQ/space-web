import { makeStyles } from '@material-ui/core/styles';
import { VIEW_MODES } from '../../constants';

const getColor = (viewMode, theme) => {
  if (viewMode === VIEW_MODES.LIGHT) {
    return theme.palette.palette.black;
  }
  return theme.palette.palette.white;
};

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
      borderColor: ({ viewMode }) => getColor(viewMode, theme),
    },
    '& span': {
      color: ({ viewMode }) => getColor(viewMode, theme),
    },
  },
  downAngle: {
    fontSize: 18,
    color: ({ viewMode }) => getColor(viewMode, theme),
    position: 'relative',
    top: 1,
    marginLeft: 5,
  },
  subtitle: {
    color: ({ viewMode }) => getColor(viewMode, theme),
  },
}));
