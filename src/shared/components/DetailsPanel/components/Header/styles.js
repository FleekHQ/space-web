import { makeStyles } from '@material-ui/core/styles';
import { VIEW_MODES } from '@shared/components/DetailsPanel/constants';

export const HORIZONTAL_PADDING = 0;

export default makeStyles((theme) => ({
  root: {
    padding: `13px ${HORIZONTAL_PADDING}px 0px`,
  },
  fileIconWrapper: {
    margin: '15px auto',
    position: 'relative',
    height: 120,
  },
  buttonsGroup: {
    display: 'flex',
    '& > *:not(:first-child)': {
      marginLeft: 7,
    },
  },
  openBtn: {
    width: '100%',
  },
  menuBtn: {
    fontSize: 18,
    padding: 6,
    flexGrow: 1,
  },
  fileName: {
    margin: '15px 0',
    textAlign: 'center',
    color: ({ viewMode }) => viewMode !== VIEW_MODES.LIGHT && theme.palette.palette.white,
  },
  arrowIcon: {
    fontSize: 11,
    marginTop: 1,
    marginLeft: 5,
  },
  icon: {
    position: 'absolute',
    filter: 'drop-shadow(-2px -2px 6px rgba(0, 0, 0, 0.12))',
  },
  centerIcon: {
    margin: 'auto',
  },
  actionButtons: {
    marginBottom: 19,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& button': {
      marginRight: 10,
    },
    '& button:last-child': {
      marginRight: 0,
    },
  },
  actionIcon: {
    fontSize: 14,
    color: ({ viewMode }) => (viewMode !== VIEW_MODES.PREVIEW ? theme.palette.palette.gray1 : '#7F8185'),
  },
  exitIcon: {
    fontSize: 21,
    color: theme.palette.palette.white,
  },
  titleExitContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
  },
  title: {
    fontSize: 18,
    color: theme.palette.palette.white,
  },
  contextMenuPopper: {
    zIndex: 1301,
  },
  disabledIcon: {
    '&&&': {
      color: 'rgba(102, 102, 102, 0.3)',
    },
  },
}));
