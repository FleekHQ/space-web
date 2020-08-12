import { makeStyles } from '@material-ui/styles';

export const useCustomToolTipStyles = makeStyles((theme) => ({
  arrow: {
    fontSize: '1.7em',
    color: ({ invert }) => (
      invert ? theme.palette.common.white : theme.palette.common.black
    ),
  },
  tooltip: ({ invert }) => ({
    borderRadius: 4,
    left: -7,
    padding: '14px 22px 14px 11px',
    color: invert ? theme.palette.common.white : theme.palette.common.black,
    border: `1px solid ${invert ? theme.palette.common.white : theme.palette.common.black}`,
    backgroundColor: invert ? theme.palette.common.black : theme.palette.common.white,
  }),
}));

export default makeStyles({
  tooltipContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  requirementList: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 5,
    paddingLeft: 15,
    margin: '-4px 0',
  },
});
