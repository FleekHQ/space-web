import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  rootRequirement: {
    display: 'flex',
    margin: '4px 0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: ({ isCorrect }) => ({
    width: 12,
    height: 12,
    marginRight: 5,
    borderRadius: '100%',
    border: isCorrect ? 'unset' : '1px solid #d4d4d4',
    backgroundColor: isCorrect ? '#00c9a7' : 'transparent',
  }),
});
