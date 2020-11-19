import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& ul > li:not(:first-child)': {
      paddingTop: 13,
      paddingBottom: 14,
      borderBottom: `1px solid ${theme.palette.palette.gray4}`,
    },
  },
  listItem: {
    outline: 'none',
    cursor: 'default',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.palette.gray4}`,
  },
  markAsReadButton: {
    padding: 0,
  },
  popoverPaper: {
    width: 280,
    // Do not use transform origin to position the top of the popover
    // since it will make the paper jump when loading more notifications
    top: '47px !important',
  },
  empty: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  notificationContainer: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    '& li:not(:first-child)': {
      paddingTop: 13,
      paddingBottom: 14,
      borderBottom: `1px solid ${theme.palette.palette.gray4}`,
    },
    maxHeight: 600,
    overflowY: 'auto',
  },
}));
