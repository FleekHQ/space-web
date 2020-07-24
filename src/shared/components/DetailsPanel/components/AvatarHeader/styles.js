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
        let margin = 0;

        if (objectsLength > 1 && objectsLength <= 4) {
          margin = 5;
        }

        if (objectsLength > 4) {
          margin = 3;
        }

        return margin;
      },
    },
  },
});
