import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  paper: {
    top: '50%',
    left: '50%',
    width: '100%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    maxWidth: ({ maxWidth }) => maxWidth,
    borderRadius: 6,
    overflow: 'auto',
    filter: 'drop-shadow(0 2px 6px #DBE1EDB2)',
    boxShadow: 'none',
    '&:focus': {
      outline: 'none',
    },
  },
}));

export const backdropStyles = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
};
