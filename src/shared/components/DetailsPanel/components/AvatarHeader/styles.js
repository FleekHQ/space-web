import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    padding: '26px 22px 18px',
  },
  avatarList: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    '& > *': {
      margin: ({ objectsLength }) => {
        if (objectsLength === 1) {
          return 0;
        }

        return 3;
      },
    },
  },
});
