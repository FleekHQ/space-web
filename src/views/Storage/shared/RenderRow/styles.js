import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  iconSizeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    width: 25,
  },
  checkIcon: {
    fontSize: 11,
    color: theme.palette.palette.green2,
  },
  notAvailableLocally: {
    color: '#7F8185',
  },
  loadingIcon: {
    fontSize: 11,
    color: theme.palette.palette.spaceBlue,
  },
  highlighted: {
    color: theme.palette.palette.spaceBlue,
  },
  uploading: {
    opacity: '50%',
  },
  uploadingIcon: {
    fontSize: 11,
    color: '#A5A5A5',
  },
  progressBar: {
    height: 10,
    width: 80,
    borderRadius: 3,
    border: '1px solid #DDE0E2',
    backgroundColor: theme.palette.palette.white,
    '&:before': {
      content: '""',
      display: 'block',
      width: ({ progress }) => `${progress * 100}%`,
      height: '100%',
      backgroundColor: '#EAEBEC',
      transition: 'width ease-out 0.5s',
    },
  },
  errorIcon: {
    fontSize: 11,
    color: theme.palette.palette.red,
  },
  errorText: {
    fontSize: 12,
    color: theme.palette.palette.red,
  },
  tooltipRoot: {
    backgroundColor: 'transparent',
  },
  popperRoot: {
    top: ({ rowIndex }) => (`${(80 + 36 * rowIndex)}px !important`),
    left: 'auto !important',
    right: 260,
    transform: 'none !important',
  },
}));
