import { makeStyles } from '@material-ui/core/styles';
import { OPTION_IDS } from './constants';

export default makeStyles((theme) => ({
  paper: {
    padding: '15px 0px 18px 18px',
    maxWidth: 400,
  },
  closeButton: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 18,
    top: 18,
  },
  closeIcon: {
    fontSize: 12,
    color: theme.palette.palette.gray1,
  },
  title: {
    marginRight: 18,
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 8,
  },
  description: {
    marginRight: 18,
    fontSize: 14,
    marginBottom: 12,
  },
  buttonsContainer: {
    marginRight: 18,
    marginTop: 25,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cancel: {
    marginRight: 10,
  },
  unselected: {
    border: `1px solid ${theme.palette.palette.gray4}`,
    boxShadow: '0 3px 6px 0 rgba(219, 225, 237, 0.9)',
  },
  accentWrapper: {
    margin: '6px 18px 6px 0',
    padding: 2,
    borderRadius: 4,
    background: `linear-gradient(134deg, ${theme.palette.palette.spacePink} 18%, ${theme.palette.palette.spaceTeal} 42%, ${theme.palette.palette.spaceGreen} 59%, ${theme.palette.palette.spaceYellow} 81%)`,
    boxShadow: 'none',
    '&:hover': {
      background: `linear-gradient(134deg, ${theme.palette.palette.spacePink} 18%, ${theme.palette.palette.spaceTeal} 42%, ${theme.palette.palette.spaceGreen} 59%, ${theme.palette.palette.spaceYellow} 81%)`,
    },
  },
  optionWrapper: {
    margin: '6px 18px 6px 0',
    padding: 2,
    '&:hover': {
      borderRadius: 4,
      background: `linear-gradient(134deg, ${theme.palette.palette.spacePink}4D 18%, ${theme.palette.palette.spaceTeal}4D 42%, ${theme.palette.palette.spaceGreen}4D 59%, ${theme.palette.palette.spaceYellow}4D 81%)`,
      boxShadow: 'none',
    },
  },
  option: {
    backgroundColor: theme.palette.palette.white,
    borderRadius: 4,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: 15,
    paddingLeft: 18,
    alignItems: 'center',
    width: '100%',
    height: 48,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  [`${OPTION_IDS.EMAIL}`]: {
    fontSize: 20,
    color: theme.palette.palette.black,
  },
  [`${OPTION_IDS.SEED_PHRASE}`]: {
    fontSize: 20,
    color: '#ECBE3E',
  },
  [`${OPTION_IDS.TWITTER}`]: {
    width: 35,
  },
  optionSecondaryText: {
    color: theme.palette.palette.blue1,
    fontSize: 14,
  },
  optionIconContainer: {
    width: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollbar: {
    color: 'red',
    backgroundColor: 'red',
    right: -5,
  },
  error: {
    color: theme.palette.palette.red,
  },
}));
