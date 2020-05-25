import React from 'react';
import PropTypes from 'prop-types';
import {
  Zip,
  Folder,
  PDF,
  Powerpoint,
  Word,
  Image,
  Audio,
  Video,
  Default,
  SimpleIcon,
} from './types';

import AudioIcon from './svgs/Audio.svg';
import UnknownIcon from './svgs/Unknown.svg';
import PDFIcon from './svgs/PDF.svg';
import PresentationIcon from './svgs/Presentation.svg';
import VideoIcon from './svgs/Video.svg';
import DocIcon from './svgs/TextDoc.svg';
import ZIPIcon from './svgs/ZIP.svg';

import { FILE_TYPES } from './constants';

const IconFile = ({
  type,
  src,
}) => {
  const iconTypeMapping = {
    [FILE_TYPES.DEFAULT]: <SimpleIcon iconSrc={UnknownIcon} />,
    [FILE_TYPES.FOLDER]: <Folder  />,
    [FILE_TYPES.PDF]: <SimpleIcon iconSrc={PDFIcon} />,
    [FILE_TYPES.ZIP]: <SimpleIcon iconSrc={ZIPIcon} />,
    [FILE_TYPES.POWERPOINT]: <SimpleIcon iconSrc={PresentationIcon} />,
    [FILE_TYPES.IMAGE]: <Image src={src}/>,
    [FILE_TYPES.WORD]: <SimpleIcon iconSrc={DocIcon} />,
    [FILE_TYPES.VIDEO]: <SimpleIcon iconSrc={VideoIcon} />,
    [FILE_TYPES.AUDIO]: <SimpleIcon iconSrc={AudioIcon} />,
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
  type: PropTypes.string.isRequired,
  src: PropTypes.string,
}

export default IconFile;
