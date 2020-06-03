import { makeStyles } from '@material-ui/core/styles';

import { stringToColor } from '@utils';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '9px 14px',
    borderTop: `solid 1px ${theme.palette.palette.gray4}`,
    borderBottom: `solid 1px ${theme.palette.palette.gray4}`,
  },
  avatarWrapper: {
    flexShrink: 0,
  },
  teamName: {
    marginBottom: 5,
  },
  textWrapper: {
    marginLeft: 14,
    minWidth: 0,
  },
  avatar: {
    width: 38,
    height: 38,
    backgroundColor: ({ selectedAccountDetails }) => (
      stringToColor(selectedAccountDetails.name)
    ),
    color: ({ selectedAccountDetails }) => {
      const color = stringToColor(selectedAccountDetails.name);

      return theme.palette.getContrastText(color);
    },
  },
}));
