import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleText: {
    fontSize: 12,
    color: theme.palette.palette.black,
  },
  usingText: {
    color: theme.palette.palette.gray1,
    fontSize: 12,
  },
  legendContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 12,
  },
  disabled: {
    border: `1px solid ${theme.palette.palette.gray14}`,
    borderRadius: 3,
  },
  chartBar: {
    height: 19,
    display: 'inline-block',
    width: '100%',
  },
  legendSkeleton: {
    marginLeft: 20,
  },
}));
