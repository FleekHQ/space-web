import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 20,
  },
  iconContainer: {
    position: 'relative',
    width: 22,
    height: 22,
    marginRight: 8,
    borderRadius: 3,
    overflow: 'hidden',
    flexShrink: 0,
  },
  arrow: {
    fontSize: 11,
  },
  arrowContainer: {
    width: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  tabulations: {
    content: '',
    width: ({ tabulations }) => (30 * tabulations),
  },
  arrowButton: {
    padding: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sharedFolder: {
    position: 'absolute',
    width: '48%',
    right: '12%',
    bottom: '20%',
  },
  icon: {
    height: '0.9em',
    margin: '0.1em 0 0 7px',
    flexShrink: 0,
  },
  name: {
    '&:hover': {
      color: theme.palette.palette.blue1,
      textDecoration: 'underline',
    },
  },
  selected: {
    color: theme.palette.palette.blue1,
  },
  tooltipArrow: {
    color: '#171717',
  },
  uploading: {
    opacity: '50%',
  },
}));
