import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  backupValue: {
    color: ({ backupStorage }) => (backupStorage
      ? theme.palette.palette.green2
      : theme.palette.palette.red
    ),
  },
  backupSwitchContainer: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: 0,
    '&&': {
      marginBottom: 0,
    },
  },
  backupDiagramContainer: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  localUsageContainer: {
    marginBottom: 10,
  },
  usageBarsWrapper: {
    flexGrow: 1,
    padding: '25px 0',
  },
}));
