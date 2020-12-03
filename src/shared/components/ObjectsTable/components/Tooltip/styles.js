import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  tooltipRoot: {
    backgroundColor: 'transparent',
  },
  popperRoot: {
    top: ({ hoveredItemIndex }) => (`${(80 + 36 * hoveredItemIndex)}px !important`),
    left: 'auto !important',
    right: 220,
    transform: 'none !important',
  },
}));
