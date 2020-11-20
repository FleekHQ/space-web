import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: 32,
  },
  dragableArea: {
    display: ({ isDragable }) => (isDragable ? 'block' : 'none'),
    '-webkit-app-region': 'drag',
    height: 32,
  },
});
