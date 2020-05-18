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
} from './types';

import { FILE_TYPES } from './constants';

const IconFile = ({
  type,
  src,
}) => {
  const iconTypeMapping = {
    [FILE_TYPES.DEFAULT]: <Default />,
    [FILE_TYPES.FOLDER]: <Folder  />,
    [FILE_TYPES.PDF]: <PDF />,
    [FILE_TYPES.ZIP]: <Zip />,
    [FILE_TYPES.POWERPOINT]: <Powerpoint />,
    [FILE_TYPES.IMAGE]: <Image src={src}/>,
    [FILE_TYPES.WORD]: <Word />,
    [FILE_TYPES.VIDEO]: <Video />,
    [FILE_TYPES.AUDIO]: <Audio />,
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
