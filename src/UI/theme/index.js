import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import * as props from './props';
import palette from './palette';
import overrides from './overrides';
import typography from './typography';

const createFleekTheme = () => createMuiTheme({
  props,
  palette,
  overrides,
  typography,
});

export default createFleekTheme;
