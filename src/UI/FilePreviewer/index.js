import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  txtExtensions,
  imgExtensions,
  supportedExtensions,
} from './constants';

import useStyles from './styles';

const FilePreviewer = ({
  url,
  extension,
}) => {
  const classes = useStyles();
  const isSupported = supportedExtensions.includes(extension);
  const isImage = imgExtensions.includes(extension);
  const isTxt = txtExtensions.includes(extension);

  if (!isSupported) {
    return null;
  }

  if (isImage) {
    return (
      <div className={classes.imgContainer}>
        <img alt="file-preview" src={url} className={classes.image} />
      </div>
    );
  }

  return (
    <iframe
      className={classnames(classes.iframe, {
        [classes.txt]: isTxt,
      })}
      title="document-preview"
      src={url}
    />
  );
};

FilePreviewer.propTypes = {
  url: PropTypes.string.isRequired,
  extension: PropTypes.string.isRequired,
};

export default FilePreviewer;
