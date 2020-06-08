import React from 'react';
import PropTypes from 'prop-types';

import PDFIcon from './svgs/PDF.svg';
import ZIPIcon from './svgs/ZIP.svg';
import AudioIcon from './svgs/Audio.svg';
import VideoIcon from './svgs/Video.svg';
import DocIcon from './svgs/TextDoc.svg';
import UnknownIcon from './svgs/Unknown.svg';
import PresentationIcon from './svgs/Presentation.svg';

import {
  Image,
  Folder,
  SimpleIcon,
} from './types';

import {
  MAP_EXT_TO_FILE_TYPE,
  FILE_TYPES,
} from './constants';

const IconFile = ({
  src,
  ext,
}) => {
  const type = MAP_EXT_TO_FILE_TYPE[ext];

  const iconTypeMapping = {
    [FILE_TYPES.FOLDER]: <Folder />,
    [FILE_TYPES.IMAGE]: <Image src={src} />,
    [FILE_TYPES.PDF]: <SimpleIcon iconSrc={PDFIcon} />,
    [FILE_TYPES.ZIP]: <SimpleIcon iconSrc={ZIPIcon} />,
    [FILE_TYPES.WORD]: <SimpleIcon iconSrc={DocIcon} />,
    [FILE_TYPES.VIDEO]: <SimpleIcon iconSrc={VideoIcon} />,
    [FILE_TYPES.AUDIO]: <SimpleIcon iconSrc={AudioIcon} />,
    [FILE_TYPES.DEFAULT]: <SimpleIcon iconSrc={UnknownIcon} />,
    [FILE_TYPES.POWERPOINT]: <SimpleIcon iconSrc={PresentationIcon} />,
  };

  const Component = () => (iconTypeMapping[type] || iconTypeMapping[FILE_TYPES.DEFAULT]);

  return (
    <Component />
  );
};

IconFile.defaultProps = {
  src: '',
};

IconFile.propTypes = {
  ext: PropTypes.string.isRequired,
  src: PropTypes.string,
};

export default IconFile;

export {
  FILE_TYPES,
};
