export const FOLDER = 'FOLDER';
export const PDF = 'PDF';
export const ZIP = 'ZIP';
export const POWERPOINT = 'POWERPOINT';
export const IMAGE = 'IMAGE';
export const WORD = 'WORD';
export const AUDIO = 'AUDIO';
export const VIDEO = 'VIDEO';
export const DEFAULT = 'DEFAULT';

export const FILE_TYPES = {
  FOLDER,
  PDF,
  ZIP,
  POWERPOINT,
  IMAGE,
  WORD,
  AUDIO,
  VIDEO,
  DEFAULT,
};

export const MAP_EXT_TO_FILE_TYPE = {
  pdf: PDF,
  zip: ZIP,
  doc: WORD,
  odt: WORD,
  rtf: WORD,
  tex: WORD,
  txt: WORD,
  wpd: WORD,
  qt: VIDEO,
  docx: WORD,
  jpg: IMAGE,
  png: IMAGE,
  gif: IMAGE,
  mp3: AUDIO,
  wav: AUDIO,
  aac: AUDIO,
  m4a: AUDIO,
  wma: AUDIO,
  mp4: VIDEO,
  ogg: VIDEO,
  m4p: VIDEO,
  m4v: VIDEO,
  avi: VIDEO,
  wmv: VIDEO,
  mov: VIDEO,
  flv: VIDEO,
  swf: VIDEO,
  mpv: VIDEO,
  mpe: VIDEO,
  mpg: VIDEO,
  mp2: VIDEO,
  jpeg: IMAGE,
  mpeg: VIDEO,
  webm: VIDEO,
  folder: FOLDER,
  ppt: POWERPOINT,
  pptx: POWERPOINT,
  key: POWERPOINT,
  odp: POWERPOINT,
  pps: POWERPOINT,
  default: DEFAULT,
};

export default FILE_TYPES;
