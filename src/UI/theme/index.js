import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import palette from './palette';
import overrides from './overrides';
import typography from './typography';

const createFleekTheme = () => {
  return createMuiTheme({
    palette,
    overrides,
    typography,
  });
};

export default createFleekTheme;
