import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';

const FilePreviewer = ({
  url,
  isImage,
}) => {
  const classes = useStyles();
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
  isImage: PropTypes.bool.isRequired,
};

export default FilePreviewer;
