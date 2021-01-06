import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    color: theme.palette.palette.black,
    background: `
      transparent
      linear-gradient(105deg,
        ${theme.palette.palette.spacePink} 0%,
        ${theme.palette.palette.spaceTeal} 37%,
        ${theme.palette.palette.spaceGreen} 60%,
        ${theme.palette.palette.spaceYellow} 100%)
      0% 0% no-repeat padding-box`,
  },
}));
