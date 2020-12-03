import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  tooltipRoot: {
    backgroundColor: 'transparent',
  },
  popperRoot: {
    top: ({ hoveredItemIndex }) => (`${(80 + 36 * hoveredItemIndex)}px !important`),
    left: 'auto !important',
    right: ({ hoveredItemOptions }) => (`${212 + hoveredItemOptions.length * 32}px !important`),
    transform: 'none !important',
  },
}));
