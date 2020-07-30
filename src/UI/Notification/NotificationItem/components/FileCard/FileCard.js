import React from 'react';
import PropTypes from 'prop-types';
import FileIcon from '@ui/FileIcon';
import Typography from '@ui/Typography';

import useStyles from './styles';

const FileCard = (props) => {
  const { ext, name } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.iconContainer}>
        <FileIcon ext={ext} />
      </div>
      <Typography variant="body2">
        { name }
      </Typography>
    </div>
  );
};

FileCard.propTypes = {
  ext: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default FileCard;
