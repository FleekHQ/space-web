import React from 'react';
import PropTypes from 'prop-types';
import { imgExtensions } from './constants';

import useStyles from './styles';

const FilePreviewer = ({
  url,
  extension,
}) => {
  const classes = useStyles();

  const isImage = imgExtensions.includes(extension);

  if (isImage) {
    return (
      <div className={classes.imgContainer}>
        <img alt="file-preview" src={url} className={classes.image} />
      </div>
    );
  }

  return (
    <iframe
      className={classes.iframe}
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
