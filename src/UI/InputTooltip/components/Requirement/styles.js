import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  rootRequirement: {
    display: 'flex',
    margin: '4px 0',
    flexDirection: 'row',
    alignItems: 'center',
    color: ({ isCorrect }) => {
      if (isCorrect) {
        return 'inherit';
      }

      return '#929292';
    },
  },
  circle: ({ isCorrect }) => ({
    width: 12,
    height: 12,
    marginRight: 5,
    borderRadius: '100%',
    border: isCorrect ? 'unset' : '1px solid #707070',
    backgroundColor: isCorrect ? '#00c9a7' : 'transparent',
  }),
});
