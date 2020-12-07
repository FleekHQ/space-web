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
