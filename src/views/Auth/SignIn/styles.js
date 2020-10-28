import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  dividerRoot: {
    color: '#5A5A5A',
    backgroundColor: '#5A5A5A',
  },
  rainbow: {
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
      background: 'linear-gradient(96deg, rgba(237, 85, 235, 1) 0%, rgba(23, 224, 216, 1) 37%, rgba(0, 255, 194, 1) 64%, rgba(255, 236, 6, 1) 100%) 0% 0% no-repeat padding-box;',
    },
    '&:hover': {
      background: 'linear-gradient(96deg, rgba(237, 85, 235, 1) 0%, rgba(23, 224, 216, 1) 37%, rgba(0, 255, 194, 1) 64%, rgba(255, 236, 6, 1) 100%) 0% 0% no-repeat padding-box;',
    },
    '&:hover .rainbow-bg': {
      background: 'linear-gradient(96deg, rgba(237, 85, 235, 0.1) 0%, rgba(23, 224, 216, 0.1) 37%, rgba(0, 255, 194, 0.1) 64%, rgba(255, 236, 6, 0.1) 100%) 0% 0% no-repeat padding-box;',
    },
  },
});
