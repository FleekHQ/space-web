import {
  fontSize,
  fontFamily,
  fontWeightMedium,
  fontWeightRegular,
} from '../settings';

import text from '../palette/text';
import { pxToRem } from '../utils';

const typographyOptions = {
  fontSize,
  fontFamily,
  fontWeightRegular,
  fontWeightMedium,
  h6: {
    color: text.primary,
    fontWeight: fontWeightRegular,
    fontStyle: 'normal',
    fontSize: pxToRem(16),
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },
  body1: {
    color: text.primary,
    fontWeight: fontWeightRegular,
    fontStyle: 'normal',
    fontSize: pxToRem(14),
    lineHeight: 1.07,
    letterSpacing: 'normal',
  },
  body2: {
    color: text.primary,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: pxToRem(12),
    lineHeight: 1.25,
    letterSpacing: 'normal',
  },
  button: {
    color: text.primary,
    fontWeight: fontWeightRegular,
    fontStyle: 'normal',
    fontSize: pxToRem(12),
    lineHeight: 1.25,
    letterSpacing: 'normal',
  },
  caption: {
    color: text.primary,
    fontWeight: fontWeightRegular,
    fontStyle: 'normal',
    fontSize: pxToRem(10),
    lineHeight: 1.5,
    letterSpacing: 'normal',
  },
};

export default typographyOptions;
