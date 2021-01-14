import { makeStyles } from '@material-ui/core/styles';
import { VIEW_MODES } from '@shared/components/DetailsPanel/constants';

export default makeStyles((theme) => ({
  root: {
    padding: '26px 0px 18px',
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
  text: {
    color: ({ viewMode }) => (
      viewMode !== VIEW_MODES.LIGHT ? theme.palete.palette.white : undefined
    ),
  },
}));
