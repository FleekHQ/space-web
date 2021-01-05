import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';

const FilePreviewer = ({
  url,
}) => {
  const classes = useStyles();

  return (
    <iframe
      className={classes.iframe}
      title="document-preview"
      src={url}
  />
  )
};

FilePreviewer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default FilePreviewer;
