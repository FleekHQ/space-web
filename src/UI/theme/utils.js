import { fontSize } from './settings';

// eslint-disable-next-line import/prefer-default-export
export const pxToRem = (size) => `${size / fontSize}rem`;
