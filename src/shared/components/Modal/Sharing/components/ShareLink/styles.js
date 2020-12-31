import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  header: {
    display: 'flex',
  },
  content: {
    marginTop: 13,
  },
  titleIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  iconContainer: ({ icon }) => ({
    height: 33,
    width: 33,
    backgroundColor: icon === 'public' ? theme.palette.palette.blue1 : '#E1E3E6',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    '& > svg': {
      color: icon === 'public' ? theme.palette.palette.white : '#7F8185',
      fontSize: icon === 'public' ? 20 : 15,
    },
  }),
  optionsContainer: {
    display: 'flex',
    marginTop: 20,
  },
  optionsButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  arrowIcon: {
    fontSize: 11,
    marginLeft: 5,
  },
  optionsIconContainer: {
    width: 14,
    height: 14,
    marginRight: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > svg': {
      color: theme.palette.palette.blue1,
      fontSize: 14,
    },
  },
  paper: {
    borderRadius: 6,
    border: '1px solid #D8D8D8',
  },
}));
