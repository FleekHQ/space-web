import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  masonryGrid: {
    padding: '0 18px',
    display: 'flex',
    marginLeft: -11,
    width: 'auto',
  },
  masonryColumn: {
    paddingLeft: 11,
    backgroundClip: 'padding-box',
  },
  itemWrapper: {
    marginBottom: 11,
  },
});
