import { makeStyles } from '@material-ui/core/styles';
import { OPTION_IDS } from '@shared/components/Modal/AddBackupSignIn/constants';

export default makeStyles((theme) => ({
  title: {
    fontSize: 12,
  },
  divider: {
    backgroundColor: theme.palette.palette.gray4,
  },
  methodContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 46,
  },
  image: {
    width: 24,
  },
  optionTitle: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 500,
  },
  titleLogoContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 150,
  },
  [`${OPTION_IDS.EMAIL}`]: {
    fontSize: 20,
    color: theme.palette.palette.black,
  },
  [`${OPTION_IDS.SEED_PHRASE}`]: {
    fontSize: 20,
    color: '#ECBE3E',
  },
  optionText3: {
    color: theme.palette.palette.blue1,
    fontSize: 14,
  },
  redText: {
    color: theme.palette.palette.red,
  },
  optionIconContainer: {
    width: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBox: {
    marginBottom: 10,
  },
  warningDescription: {
    fontSize: 12,
    marginBottom: 10,
  },
}));
