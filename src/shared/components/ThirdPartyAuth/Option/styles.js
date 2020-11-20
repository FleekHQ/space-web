import { makeStyles } from '@material-ui/styles';

const getRainbowColor = ({ opacity }) => ({ disabled }) => {
  if (disabled) {
    return 'none';
  }

  return `linear-gradient(96deg, rgba(237, 85, 235, ${opacity}) 0%, rgba(23, 224, 216, ${opacity}) 37%, rgba(0, 255, 194, ${opacity}) 64%, rgba(255, 236, 6, ${opacity}) 100%) 0% 0% no-repeat padding-box`;
};

export default makeStyles({
  logo: {
    maxWidth: 20,
  },
  iconContainer: {
    '& > img': {
      maxWidth: '100%',
    },
  },
  rainbow: {
    cursor: ({ disabled }) => {
      if (disabled) {
        return 'not-allowed';
      }

      return 'pointer';
    },
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      background: getRainbowColor({ opacity: 1 }),
    },
    '&:hover .rainbow-bg': {
      background: getRainbowColor({ opacity: 0.1 }),
    },
  },
});
