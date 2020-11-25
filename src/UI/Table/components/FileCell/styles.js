import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  iconContainer: {
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
});
