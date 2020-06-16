import React from 'react';
import PropTypes from 'prop-types';
import FileIcon from '@ui/FileIcon';
import Typography from '@ui/Typography';

import useStyles from './styles';

const Header = ({ ext, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.icon}>
        <FileIcon ext={ext} />
      </div>
      <Typography
        variant="body1"
        className={classes.title}
      >
        {children}
      </Typography>
    </div>
  );
};

Header.defaultProps = {
  ext: 'default',
  children: '',
};

Header.propTypes = {
  ext: PropTypes.string,
  children: PropTypes.string,
};

export default Header;
